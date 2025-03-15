import '../styles/globals.css';
import { inter } from '@/styles/fonts';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="container h-screen lg:w-1/3 flex mx-auto md:border border-gray-300 rounded-t-3xl">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
