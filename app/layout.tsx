// app/layout.tsx
import "./globals.css";
import Sidebar from "./sidebar/Sidebar";

export const metadata = {
  title: "NeuroTwin",
  description: "Your AI-powered cognitive clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
