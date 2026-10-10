export const orderStatuses = [
  { value: "confirmed", label: "Order confirmed" },
  { value: "in_production", label: "In production" },
  { value: "ready", label: "Ready for dispatch / pickup" },
  { value: "shipped", label: "Shipped" },
  { value: "completed", label: "Completed" },
] as const;

export type OrderStatus = (typeof orderStatuses)[number]["value"];

export type OrderItem = {
  productId?: number;
  productName: string;
  productImage?: string;
  size?: string;
  color?: string;
  quantity: number;
  unitPrice?: number;
  lineTotal?: number;
};

export type OrderStatusEvent = {
  status: OrderStatus;
  occurredAt: string;
};

export type CustomerOrder = {
  id: string;
  reference: string;
  placedAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  total: number;
  payment?: {
    status?: string;
    method?: string;
  };
  fulfilment?: {
    method?: string;
    address?: string;
    pickupLocation?: string;
  };
  trackingReference?: string;
  estimatedDelivery?: string;
  receiptUrl?: string;
  statusHistory?: OrderStatusEvent[];
  skippedStatuses?: OrderStatus[];
  developmentPreview?: boolean;
};
