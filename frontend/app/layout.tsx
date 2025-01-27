import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from '../contexts/ClientContext';
import { ChatProvider } from '../contexts/ChatContext';
import { ThreadProvider } from '../contexts/ThreadContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialize your LangGraph client configuration
const clientConfig = {
  apiUrl: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL || 'http://localhost:8123',
  apiKey: process.env.NEXT_PUBLIC_LANGGRAPH_API_KEY,
  graphId: 'react_agent'
};

export const metadata: Metadata = {
  title: "LangGraph Starter Kit",
  description: "A starter kit for building LangGraph applications with Next.js",
};

// Providers wrapper component
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider config={clientConfig}>
      <ChatProvider>
        <ThreadProvider>
          {children}
        </ThreadProvider>
      </ChatProvider>
    </ClientProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
