// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
// NOVOS IMPORTS:
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kruka | Smart Living",
  description: "Vasos inteligentes para plantas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* Envolvemos TUDO com o CartProvider */}
        <CartProvider>
          <CustomCursor /> 
          <Navbar />
          <CartSidebar /> {/* O Carrinho fica aqui, disponível globalmente */}
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}