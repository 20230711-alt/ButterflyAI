import "./globals.css";

export const metadata = {
  title: "ButterflyAI",
  description: "Hệ thống nhận diện loài bướm bằng AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}