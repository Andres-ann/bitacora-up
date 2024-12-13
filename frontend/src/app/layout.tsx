import '../styles/globals.css';
import { raleway } from '@/styles/fonts';
import Navbar from '@/ui/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${raleway.className} antialised`}>
        <div className="container h-screen lg:w-1/3 flex mx-auto md:border border-gray-300 rounded-t-3xl">
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
