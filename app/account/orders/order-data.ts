import type {
  CustomerOrder,
  OrderStatus,
} from "@/app/account/orders/order-types";
import { shopProducts } from "@/app/data/products";

const developmentOrderFixtures: {
  id: string;
  reference: string;
  placedAt: string;
  status: OrderStatus;
  productIds: number[];
}[] = [
  {
    id: "dev-order-onravel-001",
    reference: "ONR-DEV-001",
    placedAt: "2026-10-05T10:00:00.000Z",
    status: "confirmed",
    productIds: [1],
  },
  {
    id: "dev-order-onravel-002",
    reference: "ONR-DEV-002",
    placedAt: "2026-10-06T10:00:00.000Z",
    status: "in_production",
    productIds: [2, 3],
  },
  {
    id: "dev-order-onravel-003",
    reference: "ONR-DEV-003",
    placedAt: "2026-10-07T10:00:00.000Z",
    status: "ready",
    productIds: [5],
  },
  {
    id: "dev-order-onravel-004",
    reference: "ONR-DEV-004",
    placedAt: "2026-10-08T10:00:00.000Z",
    status: "shipped",
    productIds: [8],
  },
  {
    id: "dev-order-onravel-005",
    reference: "ONR-DEV-005",
    placedAt: "2026-10-09T10:00:00.000Z",
    status: "completed",
    productIds: [10, 11],
  },
];

function getFixtureProduct(productId: number) {
  const product = shopProducts.find(({ id }) => id === productId);

  if (!product) {
    throw new Error(`Development order references missing product ${productId}.`);
  }

  return product;
}

const developmentOrders: CustomerOrder[] = developmentOrderFixtures.map(
  ({ productIds, ...order }) => {
    const items = productIds.map((productId, index) => {
      const product = getFixtureProduct(productId);

      return {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        ...(index === 0 ? { size: "Custom", color: "Navy Blue" } : {}),
        quantity: 1,
        unitPrice: product.price,
        lineTotal: product.price,
      };
    });
    const subtotal = items.reduce(
      (sum, item) => sum + (item.lineTotal ?? 0),
      0,
    );

    return {
      ...order,
      items,
      subtotal,
      total: subtotal,
      developmentPreview: true,
    };
  },
);

// Replace this development-only preview with orders already authorised for the signed-in customer.
export const customerOrders: CustomerOrder[] =
  process.env.NODE_ENV === "development" ? developmentOrders : [];
