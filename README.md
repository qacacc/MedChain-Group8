# Ứng dụng Blockchain trong lưu trữ và bảo mật hồ sơ bệnh án điện tử (Nhóm 8)

Đây là mã nguồn giao diện cho dự án "Ứng dụng Blockchain trong lưu trữ và bảo mật hồ sơ bệnh án điện tử" của Nhóm 8. Cấu trúc frontend sử dụng React (TypeScript) kết hợp với Vite, CSS thuần và cấu hình tích hợp Tailwind CSS mang lại trải nghiệm Web hiện đại, hiệu suất cao và chuẩn hóa.

**🌐 WEBSITE CHÍNH THỨC ĐANG HOẠT ĐỘNG:** [https://medchain-group-8.web.app](https://medchain-group-8.web.app)

## ✨ Tính Năng Nổi Bật (Features)

- **Giao diện hiện đại (Modern UI):** Sử dụng các hiệu ứng animation tinh tế (Fade Rise) và thiết kế typography chuyên nghiệp tập trung vào `Instrument Serif` & `Inter`.
- **Hệ thống xác thực (Firebase Auth):** Đăng nhập/Đăng ký bảo mật, liên kết trực tiếp với hệ sinh thái Firebase.
- **Tối ưu hóa Hiệu Suất (Performance Optimized):** Xây dựng bằng hệ sinh thái Vite + TypeScript đảm bảo việc phát triển (HMR) và build cực nhanh.
- **Tích hợp Tailwind CSS:** Hệ thống Utility-first CSS giúp xây dựng giao diện nhanh chóng, dễ bảo trì.

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Framework:** React 19
- **Ngôn ngữ:** TypeScript
- **Luồng Build & Phát Triển:** Vite 8
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer.
- **Backend/Database:** Firebase (Auth, Firestore, Hosting)

## 🚀 Hướng Dẫn Cài Đặt và Khởi Chạy (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất như v18 hoặc v20)
- Trình quản lý gói `npm`, `yarn` hoặc `pnpm`.

### 2. Cài đặt và Chạy thử nghiệm (Local Development)
Sau khi tải code về máy, mở Terminal và chạy lần lượt các lệnh sau:
```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Cài đặt Firebase tools (Nếu muốn tự deploy)
npm install firebase
npm install -g firebase-tools

# 3. Khởi chạy Server dev
npm run dev
```
Dự án sẽ khởi chạy tại URL [http://localhost:5173/](http://localhost:5173/). 

### 3. Hướng dẫn Deploy lên Firebase Hosting (Production)
Để cập nhật website lên địa chỉ `https://medchain-group-8.web.app`, chạy các lệnh sau:
```bash
# 1. Build mã nguồn ra thư mục dist/
npm run build

# 2. Đẩy lên Firebase Hosting
firebase deploy
```

## ⚠️ Lưu ý Cực Kỳ Quan Trọng về Firebase Authentication
Nếu bạn gặp lỗi `auth/configuration-not-found` khi cố gắng tạo tài khoản hoặc đăng nhập, có nghĩa là tính năng Đăng nhập Email/Mật khẩu chưa được bật trên Firebase Console.
**Cách khắc phục:**
1. Truy cập vào [Firebase Console](https://console.firebase.google.com/) -> Chọn Project `medchain-group-8`.
2. Ở thanh bên trái, chọn **Build** -> **Authentication**.
3. Nhấp vào nút **Get Started**.
4. Chọn tab **Sign-in method**, nhấp vào **Email/Password**.
5. Bật công tắc (Enable) ở dòng đầu tiên (Email/Password) và bấm **Save**.
6. Quay lại website, tính năng Đăng nhập/Đăng ký sẽ hoạt động hoàn hảo và dữ liệu người dùng sẽ được lưu!

## 📂 Tổ Chức Code (Folder Structure)

```text
├── src/
│   ├── assets/       # Tài nguyên đồ hoạ tĩnh
│   ├── components/   # Các Component giao diện nhỏ (AuthModal)
│   ├── App.tsx       # Component Root và Điều hướng Đăng nhập
│   ├── AppSimulation.tsx # Mô phỏng Mạng lưới Node toàn cầu
│   ├── firebase.ts   # Cấu hình API kết nối Firebase
│   └── index.css     # Định nghĩa Base CSS, Animation Keyframes
├── firebase.json     # Cấu hình Firebase Hosting
├── tailwind.config.js# Cấu hình TailwindCSS nội bộ
└── package.json      # Dependencies
```
