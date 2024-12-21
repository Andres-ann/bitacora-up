import '../styles/globals.css';
import { inter } from '@/styles/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialised`}>
        <div className="container h-screen lg:w-1/3 flex mx-auto md:border border-gray-300 rounded-t-3xl">
          {children}
        </div>
      </body>
    </html>
  );
}
