import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a more iOS-like feel
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Use Inter

export const metadata: Metadata = {
  title: 'FamilySafe AI',
  description: 'AI-powered family violence risk assessment and prevention tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}> {/* Add font variable */}
      <body className={`font-sans antialiased`}> {/* Apply font */}
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
