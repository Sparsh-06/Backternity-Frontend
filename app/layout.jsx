import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
  title: "Backternity",
  description: "Build scalable backend via command line",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-w-[320px] max-w-[100vw] overflow-x-hidden">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(100%_100%_at_50%_0%,#050505_0%,#090909_40%,#0d0d0d_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_30%,rgba(0,255,120,0.07)_0%,transparent_85%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_70%,rgba(0,255,255,0.04)_0%,transparent_90%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_100%,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
        </div>
        <NextTopLoader color="#50C878" showAtBottom/>
        {children}
      </body>
    </html>
  );
}
