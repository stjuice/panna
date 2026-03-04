import { Link } from "react-router-dom";
import { useOrders } from "./hooks/useOrders";
import OrderList from "./components/OrderList";
import styles from "@/styles/orders.module.scss";

export default function OrdersPage() {
	const { data: orders, isLoading, error } = useOrders();

	if (isLoading) return <div className={styles.container}>Loading…</div>;
	if (error) return <div className={styles.container}>Error loading orders.</div>;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Orders</h1>
				<Link to="/search">Search</Link>
			</div>
			<OrderList orders={orders ?? []} />
		</div>
	);
}
