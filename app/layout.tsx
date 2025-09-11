import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'DASHBOARD MONITORING BARANG MILIK NEGARA (BMN)',
  description: 'Aplikasi Monitoring BMN',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
