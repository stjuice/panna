import { Link } from "react-router-dom";
import type { OrderCardProps } from "./types";
import styles from "@/styles/orders.module.scss";

const OrderCard = ({ order, onClick }: OrderCardProps) => {
	const handleClick = onClick ? () => onClick(order.order_id) : undefined;

	return (
		<Link
			to={`/order/${order.order_id}`}
			className={styles.card}
			style={{ display: "block" }}
			onClick={handleClick}
		>
			<div className={styles.itemHeader}>
				<div className={styles.name}>{order.customer_name}</div>
				<div className={styles.id}>#{order.order_number}</div>
			</div>
			<div className={styles.meta}>
				<span>{order.type}</span>
				{` · `}
				<span>{order.status}</span>
				{order.release_date && <>{` · `}<span>{order.release_date.split("T")[0]}</span></>}
			</div>
		</Link>
	);
};

export default OrderCard;
