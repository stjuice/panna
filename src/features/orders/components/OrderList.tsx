import type { OrderFlat } from "../types";
import OrderCard from "./OrderCard";
import styles from "@/styles/orders.module.scss";

type OrderListProps = {
	orders: OrderFlat[];
};

const OrderList = ({ orders }: OrderListProps) => {
	return (
		<div className={styles.list}>
			{orders.map((order) => (
				<OrderCard key={order.order_id} order={order} />
			))}
		</div>
	);
};

export default OrderList;
