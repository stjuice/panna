import { useParams, Link } from "react-router-dom";
import { useOrder } from "@/features/orders/hooks/useOrders";
import styles from "@/styles/orders.module.scss";

export default function OrderDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const orderId = id ? parseInt(id, 10) : NaN;
	const { data: order, isLoading, error } = useOrder(orderId);

	if (!Number.isFinite(orderId))
		return (
			<div className={styles.container}>
				<p>Invalid order ID.</p>
				<Link to="/">Back to list</Link>
			</div>
		);
	if (isLoading) return <div className={styles.container}>Loading…</div>;
	if (error || !order)
		return (
			<div className={styles.container}>
				<p>Order not found.</p>
				<Link to="/">Back to list</Link>
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Order #{order.order_id}</h1>
				<Link to="/">Back to list</Link>
			</div>
			<div className={styles.card}>
				<div className={styles.itemHeader}>
					<div className={styles.name}>{order.customer_name}</div>
					<div className={styles.id}>#{order.order_id}</div>
				</div>
				<div className={styles.meta}>
					<span>{order.created_at?.split("T")[0]}</span>
					{order.customer_phone && <>{" · "}<span>{order.customer_phone}</span></>}
				</div>
				<div className={styles.meta}>
					<span>{order.type}</span>{" · "}<span>{order.status}</span>
				</div>
				{order.description && <div className={styles.details}>{order.description}</div>}
				{order.school_name && (
					<div className={styles.meta}>
						School: {order.school_name}{order.school_city && ` (${order.school_city})`}
					</div>
				)}
				<div className={styles.meta}>
					{order.price != null && <span>Price: ${order.price}</span>}
					{order.deposit != null && <>{" · "}<span>Deposit: ${order.deposit}</span></>}
					{order.remaining != null && <>{" · "}<span>Remaining: ${order.remaining}</span></>}
				</div>
				{order.release_date && (
					<div className={styles.meta}>Release: {order.release_date.split("T")[0]}</div>
				)}
				{order.next_visit_date && (
					<div className={styles.meta}>Next visit: {order.next_visit_date.split("T")[0]}</div>
				)}
			</div>
		</div>
	);
}
