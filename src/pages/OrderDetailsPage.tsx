import { useParams, Link } from "react-router-dom";
import { useOrder } from "@/behavior/orders/useOrder";
import styles from "@/styles/orders.module.scss";
import BackButton from "@/components/buttons/BackButton";

const OrderDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const orderId = id ?? "";
	const { data: order, isLoading, error } = useOrder(orderId);

	if (!orderId)
		return (
			<div className={styles.container}>
				<p>Invalid order ID.</p>
        <BackButton to="/search" text="Back to orders"/>
			</div>
		);
	if (isLoading) return <div className={styles.container}>Loading…</div>;
	if (error || !order)
		return (
			<div className={styles.container}>
				<p>Order not found.</p>
        <BackButton to="/search" text="Back to orders"/>
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
        <BackButton to="/" text="Назад"/>
        <h1 className={styles.pageTitle}>Деталі замовлення #{order.order_number}</h1>
			</div>
			<div className={styles.card}>
				<div className={styles.itemHeader}>
					<div className={styles.name}>{order.customer_name}</div>
					<div className={styles.id}>#{order.order_number}</div>
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
};

export default OrderDetailsPage;
