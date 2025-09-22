"use client"
import './globals.css'; 
import { Poppins } from 'next/font/google';

import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>

          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

