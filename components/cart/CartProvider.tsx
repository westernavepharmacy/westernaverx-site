"use client";

import { createContext, useCallback, useContext, useEffect, useState, useTransition } from "react";
import { addLine, attestAge, fetchCart, setLineQuantity, type Cart } from "@/lib/cart";

const CART_ID_KEY = "wave_cart_id";

type CartContextValue = {
  cart: Cart | null;
  count: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  pending: boolean;
  addItem: (variantGid: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  confirmAge: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const applyCart = useCallback((next: Cart | null) => {
    setCart(next);
    if (next) localStorage.setItem(CART_ID_KEY, next.id);
    else localStorage.removeItem(CART_ID_KEY);
  }, []);

  // Restore the cart across visits.
  useEffect(() => {
    const id = localStorage.getItem(CART_ID_KEY);
    if (!id) return;
    fetchCart(id)
      .then((c) => applyCart(c))
      .catch(() => localStorage.removeItem(CART_ID_KEY));
  }, [applyCart]);

  const addItem = useCallback(
    (variantGid: string) => {
      startTransition(async () => {
        const next = await addLine(cart?.id ?? null, variantGid, 1);
        applyCart(next);
        setDrawerOpen(true);
      });
    },
    [cart?.id, applyCart]
  );

  const setQuantity = useCallback(
    (lineId: string, quantity: number) => {
      if (!cart) return;
      startTransition(async () => {
        applyCart(await setLineQuantity(cart.id, lineId, quantity));
      });
    },
    [cart, applyCart]
  );

  const confirmAge = useCallback(() => {
    if (!cart) return;
    startTransition(async () => {
      applyCart(await attestAge(cart.id));
    });
  }, [cart, applyCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        count: cart?.totalQuantity ?? 0,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        pending,
        addItem,
        setQuantity,
        confirmAge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
