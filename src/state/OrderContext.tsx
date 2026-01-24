import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GroupOrder } from '../models/GroupOrder';
import type { OrderAction } from './orderReducer';
import { orderReducer, initialState } from './orderReducer';

interface OrderContextType {
  order: GroupOrder | null;
  dispatch: React.Dispatch<OrderAction>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}