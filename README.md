# Ứng dụng Blockchain trong lưu trữ và bảo mật hồ sơ bệnh án điện tử (Nhóm 8)

Đây là mã nguồn giao diện cho dự án "Ứng dụng Blockchain trong lưu trữ và bảo mật hồ sơ bệnh án điện tử" của Nhóm 8. Cấu trúc frontend sử dụng React (TypeScript) kết hợp với Vite, CSS thuần và cấu hình tích hợp Tailwind CSS mang lại trải nghiệm Web hiện đại, hiệu suất cao và chuẩn hóa.

## ✨ Tính Năng Nổi Bật (Features)

- **Giao diện hiện đại (Modern UI):** Sử dụng các hiệu ứng animation tinh tế (Fade Rise) và thiết kế typography chuyên nghiệp tập trung vào `Instrument Serif` & `Inter`.
- **Liquid Glass Effect:** Hiệu ứng kính bóng mờ tinh xảo dành cho các component tương tác như nút bấm (Buttons), mang lại cảm giác thiết kế cao cấp (Premium UI).
- **Tối ưu hóa Hiệu Suất (Performance Optimized):** Xây dựng bằng hệ sinh thái Vite + TypeScript đảm bảo việc phát triển (HMR) và build cực nhanh.
- **Tích hợp Tailwind CSS:** Hệ thống Utility-first CSS giúp xây dựng giao diện nhanh chóng, dễ bảo trì, dễ thay đổi (Theming dựa trên HSL variables).

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Framework:** React 19
- **Ngôn ngữ:** TypeScript
- **Luồng Build & Phát Triển:** Vite 8
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer, kết hợp CSS Custom Properties.
- **Code Quality:** ESLint

## 🚀 Hướng Dẫn Cài Đặt và Khởi Chạy (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất như v18 hoặc v20)
- Trình quản lý gói `npm`, `yarn` hoặc `pnpm`.

### 2. Cài đặt các thư viện phụ thuộc (Install Dependencies)
Sau khi pull code về máy, chạy lệnh sau tại thư mục gốc:
```bash
npm install
```

### 3. Khởi chạy môi trường phát triển (Run Development Server)
Khởi chạy Live Server qua Vite:
```bash
npm run dev
```
Dự án sẽ khởi chạy tại URL [http://localhost:5173/](http://localhost:5173/). Mọi sửa đổi trong mã nguồn sẽ được hệ thống Hot Module Replacement (HMR) phản hồi lại ngay lập tức trên trình duyệt.

### 4. Đóng gói cho Production (Build for Production)
```bash
npm run build
```
Kết quả build hoàn chỉnh sẵn sàng để đẩy lên hosting sẽ được gom tại thư mục `dist`.

## 📂 Tổ Chức Code (Folder Structure)

```text
├── src/
│   ├── assets/       # Tài nguyên đồ hoạ tĩnh (hình ảnh, icons, v.v.)
│   ├── App.tsx       # Component Root (Điểm bắt đầu của Cây Component)
│   ├── Hero.tsx      # Component hiển thị Màn Hình Chính
│   ├── index.css     # Định nghĩa Base CSS, Global CSS variables và tích hợp Tailwind
│   └── main.tsx      # Entry file gắn kết React DOM với index.html
├── index.html        # Khung HTML gốc chứa các thẻ meta và font CDN
├── tailwind.config.js# Cấu hình TailwindCSS nội bộ
├── vite.config.ts    # Cấu hình Bundle/Server của Vite
└── package.json      # Mapping metadata và tracking dependencies
```

---
*Ghi chú (Note): Giao diện đang ở giai đoạn hoàn thiện. Các chức năng chuyên mảng Blockchain (Lưu trữ và bảo mật) sẽ được module hóa và tích hợp dần theo tiến độ dự án.*
