@echo off
SET REPO_URL=https://github.com/qacacc/MedChain-Group8.git

echo =======================================================
echo   MedChain - GitHub Upload Script (Nhom 8)
echo =======================================================
echo.

:: Kiem tra Git da duoc cai dat chua
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Git chua duoc cai dat tren may tinh cua ban.
    echo Hay tai Git tai: https://git-scm.com/
    pause
    exit /b
)

echo [1/5] Khoi tao Git local...
if not exist .git (
    git init
)

echo [2/5] Them tat ca file vao hang cho (Staging)...
git add .

echo [3/5] Tao ban cam ket (Commit) dau tien...
git commit -m "Initial commit - MedChain Group 8 Project"

echo [4/5] Cau hinh Remote Repository...
:: Xoa origin cu neu co
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo [5/5] Day code len GitHub (Push)...
echo Vui long xac thuc neu duoc yeu cau...
git push -u origin main

echo.
echo =======================================================
echo   THANH CONG! Project da duoc tai len GitHub.
echo   Link: %REPO_URL%
echo =======================================================
echo.
pause
