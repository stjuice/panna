import type { OrderStatus, OrderType } from "./types";

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
	graduation: "випускна",
	wedding: "весільна",
	party: "вечірня",
	other: "інша",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
	new: "нове",
	fitting: "примірка",
	released: "видано",
	cancelled: "скасовано",
};
