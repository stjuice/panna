import { Link } from "react-router-dom";
import type { OrderFlat } from "../types";
import styles from "@/styles/orders.module.scss";

type OrderCardProps = {
	order: OrderFlat;
};

const OrderCard = ({ order }: OrderCardProps) => {
	return (
		<Link to={`/order/${order.order_id}`} className={styles.card} style={{ display: "block" }}>
			<div className={styles.itemHeader}>
				<div className={styles.name}>{order.customer_name}</div>
				<div className={styles.id}>#{order.order_id}</div>
			</div>
			<div className={styles.meta}>
				<span>{order.created_at?.split("T")[0]}</span>
				{order.customer_phone && <>{` · `}<span>{order.customer_phone}</span></>}
				{order.school_name && <>{` · `}<span>{order.school_name}</span></>}
			</div>
			<div className={styles.meta}>
				<span>{order.type}</span>
				{` · `}
				<span>{order.status}</span>
				{order.price != null && <>{` · `}<span>${order.price}</span></>}
			</div>
			{order.description && <div className={styles.details}>{order.description}</div>}
		</Link>
	);
};

export default OrderCard;
