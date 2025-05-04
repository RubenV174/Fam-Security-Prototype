import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/componentes/ui/toaster";

// Setup Inter font with CSS variable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Define the CSS variable name
});

export const metadata: Metadata = {
  title: 'Fam Security',
  description: 'Comprende mejor la dinámica familiar y toma medidas hacia un entorno más seguro y saludable.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variable class to html tag and set lang to "es"
    <html lang="es" className={inter.variable}>
      {/* Apply the font-sans utility class to body */}
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
