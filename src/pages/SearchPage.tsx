import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchOrders } from "@/features/orders/hooks/useSearchOrders";
import OrderList from "@/features/orders/components/OrderList";
import styles from "@/styles/orders.module.scss";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const { data: orders = [], isLoading } = useSearchOrders(query);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Search orders</h1>
				<Link to="/">Back to list</Link>
			</div>
			<input
				type="search"
				placeholder="Name, phone, or details…"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				style={{ marginBottom: "1rem", padding: "0.5rem" }}
			/>
			{isLoading ? <div>Loading…</div> : <OrderList orders={orders} />}
		</div>
	);
}
