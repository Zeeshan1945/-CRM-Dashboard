import { Header } from "@/components/shell/Header";
import { Sidebar } from "@/components/shell/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-3 left-3 z-50 rounded-full bg-primary px-4 py-2 text-primary-fg focus:not-sr-only"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="mx-auto w-full max-w-[1920px] px-4 pb-12 sm:px-6 lg:pr-[26px] lg:pl-[105px]">
        <Header />
        <main id="main" className="pt-8 lg:pt-[33px]">
          {children}
        </main>
      </div>
    </>
  );
}
