"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CartSidebar() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, toggleCart, isCartOpen, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop (Fundo escuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Gaveta Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[70] flex flex-col border-l border-neutral-100"
          >
            {/* Cabeçalho */}
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white/50 backdrop-blur-xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={20} /> Seu Carrinho
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Seu carrinho está vazio.</p>
                  <button onClick={toggleCart} className="text-green-600 font-bold hover:underline text-sm">
                    Continuar comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Imagem */}
                    <div className="relative w-24 h-24 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    
                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-neutral-900 line-clamp-2 pr-4">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-neutral-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        
                        {/* CONTROLES DE QUANTIDADE */}
                        <div className="flex items-center gap-3 bg-neutral-50 rounded-lg p-1 border border-neutral-100">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-neutral-600 hover:text-black hover:scale-105 active:scale-95 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-neutral-600 hover:text-black hover:scale-105 active:scale-95 transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-bold text-green-600">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé (Total) */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-neutral-900">{cartTotal}</span>
                </div>
                <button className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg active:scale-[0.98]">
                  Finalizar Compra
                </button>
                <p className="text-center text-[10px] text-neutral-400 mt-4 flex items-center justify-center gap-1 uppercase tracking-wider">
                  🔒 Pagamento Seguro
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}