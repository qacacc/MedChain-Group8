import { useState, useEffect } from "react";
import Hero from "./Hero";
import AppSimulation from "./AppSimulation";
import AuthModal from "./components/AuthModal";
import { auth } from "./firebase";
import { onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import type { User } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

function App() {
  const [page, setPage] = useState<"home" | "simulation">("home");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const handleEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Vui lòng nhập lại email để xác nhận đăng nhập');
        }
        if (email) {
          try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            
            // Check if there is pending registration data to save
            const pendingRegData = window.localStorage.getItem('medchainRegistrationPending');
            if (pendingRegData && result.user) {
              const regData = JSON.parse(pendingRegData);
              const db = getFirestore();
              await setDoc(doc(db, 'users', result.user.uid), {
                email: result.user.email,
                fullName: regData.fullName || 'Người dùng Ẩn danh',
                role: regData.role || 'patient',
                medicalId: regData.medicalId || 'N/A',
                createdAt: serverTimestamp(),
                status: 'verified'
              }, { merge: true });
              window.localStorage.removeItem('medchainRegistrationPending');
            }
            
            setPage("simulation");
          } catch (error) {
            console.error("Lỗi đăng nhập bằng link:", error);
            alert("Link đăng nhập không hợp lệ hoặc đã hết hạn.");
          }
        }
      }
    };

    handleEmailLink();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenSimulation = () => {
    if (user || isGuest) {
      setPage("simulation");
    } else {
      setShowAuth(true);
    }
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
    setShowAuth(false);
    setPage("simulation");
  };

  if (page === "simulation") {
    return <AppSimulation onBack={() => setPage("home")} />;
  }

  return (
    <>
      <Hero onOpenSimulation={handleOpenSimulation} />
      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onGuestLogin={handleGuestLogin}
        />
      )}
    </>
  );
}

export default App;
