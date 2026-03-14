import type { OrderFlat } from "behavior/orders";

export type OrderCardProps = {
	order: OrderFlat;
	onClick?: (id: string) => void;
};

export type OrderListProps = {
	orders: OrderFlat[];
	onOrderClick?: (id: string) => void;
};
