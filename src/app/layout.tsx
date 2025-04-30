import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a more iOS-like feel
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Use Inter

export const metadata: Metadata = {
  title: 'FamilySafe AI',
  description: 'Herramienta de evaluación y prevención de riesgos de violencia familiar impulsada por IA.', // Translated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}> {/* Changed lang to "es" and removed extra whitespace */}
      <body className={`font-sans antialiased`}> {/* Apply font */}
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
