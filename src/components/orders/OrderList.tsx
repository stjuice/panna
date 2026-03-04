import OrderCard from "./OrderCard";
import type { OrderListProps } from "./types";
import styles from "@/styles/orders.module.scss";

const OrderList = ({ orders, onOrderClick }: OrderListProps) => {
	return (
		<div className={styles.list}>
			{orders.map((order) => (
				<OrderCard key={order.order_id} order={order} onClick={onOrderClick} />
			))}
		</div>
	);
};

export default OrderList;
