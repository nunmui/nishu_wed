import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="layout">
        <Navbar/>
        <div className="main-content">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
