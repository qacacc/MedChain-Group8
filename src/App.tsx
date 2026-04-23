import { useState, useEffect } from "react";
import Hero from "./Hero";
import AppSimulation from "./AppSimulation";
import AuthModal from "./components/AuthModal";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

function App() {
  const [page, setPage] = useState<"home" | "simulation">("home");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenSimulation = () => {
    if (user) {
      setPage("simulation");
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = () => {
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
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

export default App;
