import { montserrat } from '@/styles/fonts';
import '../styles/globals.css';
import Navbar from '@/ui/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialised`}>
        <div className="container h-screen lg:w-1/3 flex mx-auto lg:border border-gray-300 p-3 rounded-t-3xl">
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
