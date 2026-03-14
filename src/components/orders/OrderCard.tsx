import styles from "styles/orders.module.scss";
import type { OrderCardProps } from "./types";
import { Link } from "react-router-dom";
import { formatDate } from "lib/formatDate";
import { ORDER_STATUS_LABEL, ORDER_TYPE_LABEL } from "behavior/orders";

const OrderCard = ({ order, onClick }: OrderCardProps) => {
	const handleClick = onClick ? () => onClick(order.order_id) : undefined;

	return (
		<Link
			to={`/orders/${order.order_id}`}
			className={styles.card}
			style={{ display: "block" }}
			onClick={handleClick}
		>
			<div className={styles.itemHeader}>
				<div className={styles.name}>{order.customer_name}</div>
				<div className={styles.id}>#{order.order_number}</div>
			</div>
			<div className={styles.meta}>
				<span>{ORDER_TYPE_LABEL[order.type]}</span>
				{` · `}
				<span>{ORDER_STATUS_LABEL[order.status]}</span>
				{order.release_date && <>{` · `}{formatDate(order.release_date)}</>}
			</div>
		</Link>
	);
};

export default OrderCard;
