import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LiveChat from "@/components/LiveChat";

export const metadata = {
  title: "SchoolGrade Link (SGLink) | Cybersecurity Education & Infrastructure Solutions",
  description:
    "SchoolGrade Link (SGLink) – specialized cybersecurity education and technology solutions for critical infrastructure organizations."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <main className="pt-28">{children}</main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}
