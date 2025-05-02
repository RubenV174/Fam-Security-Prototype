import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Setup Inter font with CSS variable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Define the CSS variable name
});

export const metadata: Metadata = {
  title: 'Fam Security',
  description: 'Herramienta de evaluación y prevención de riesgos de violencia familiar impulsada por IA.',
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
