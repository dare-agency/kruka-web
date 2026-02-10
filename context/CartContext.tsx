"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void; // NOVO
  decreaseQuantity: (id: string | number) => void; // NOVO
  toggleCart: () => void;
  isCartOpen: boolean;
  cartTotal: string;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Adicionar Item (ou aumentar se já existe)
  const addItem = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abre o carrinho
  };

  // Remover Item completamente
  const removeItem = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Aumentar Quantidade (+)
  const increaseQuantity = (id: string | number) => {
    setItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  // Diminuir Quantidade (-)
  const decreaseQuantity = (id: string | number) => {
    setItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          // Se for 1 e diminuir, remove o item? Ou trava em 1? 
          // Aqui vou fazer remover se chegar a 0.
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0) // Remove itens com qtd 0
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Cálculos
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalValue = items.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace("€", "").replace(",", ".").trim());
    return acc + (priceNumber * item.quantity);
  }, 0);
  
  const cartTotal = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(totalValue);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increaseQuantity, decreaseQuantity, toggleCart, isCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};