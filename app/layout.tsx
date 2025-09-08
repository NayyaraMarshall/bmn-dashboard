import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard Monitoring Barang Milik Negara (BMN)',
  description: 'Aplikasi Monitoring BMN',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
