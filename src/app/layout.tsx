import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://payperchat.github.io'),
  title: {
    template: '%s | PayPerChat Blog',
    default: 'PayPerChat Blog - AI Cost Optimization Guides',
  },
  description: 'AI cost optimization and LLM usage guides. Save 70% with pay-per-use AI services.',
  keywords: ['AI', 'LLM', 'cost optimization', 'ChatGPT alternative', 'pay-per-use', 'PayPerChat'],
  authors: [{ name: 'PayPerChat' }],
  creator: 'PayPerChat',
  publisher: 'PayPerChat',
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code', // 실제 코드로 교체 필요
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
