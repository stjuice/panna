import { Link } from "react-router-dom";
import { useOrders } from "behavior/orders";
import OrderList from "components/orders/OrderList";
import styles from "styles/orders.module.scss";

const OrdersListPage = () => {
	const { data: orders, isLoading, error } = useOrders();

	if (isLoading) return <div className={styles.container}>Loading…</div>;
	if (error) return <div className={styles.container}>Error loading orders.</div>;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Orders</h1>
				<nav style={{ display: "flex", gap: "1rem" }}>
					<Link to="/">Home</Link>
					<Link to="/search">Search</Link>
				</nav>
			</div>
			<OrderList orders={orders ?? []} />
		</div>
	);
};

export default OrdersListPage;
