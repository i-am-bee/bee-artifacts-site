import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import '../styles/globals.css';

const ibmPlexSans = localFont({
  src: [
    {
      path: '../fonts/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/IBMPlexSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
  title: 'Bee Artifact',
  icons: { icon: '//www.ibm.com/favicon.ico' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${ibmPlexSans.variable} antialiased`} lang="en">
      <body className="bg-layer">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
