import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4EE] to-[#FDFBF7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}