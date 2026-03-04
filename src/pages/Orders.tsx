import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "@/behavior/orders/useOrders";
import { useOrder } from "@/behavior/orders/useOrder";
import { useQuery } from "@tanstack/react-query";
import { searchOrders } from "@/api/orders.api";
import OrderList from "@/components/orders/OrderList";
import styles from "@/styles/orders.module.scss";

export const OrdersListPage = () => {
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

export const OrdersSearchPage = () => {
	const [query, setQuery] = useState("");

	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["orders-search", query],
		queryFn: () =>
			query.trim() ? searchOrders(query.trim()) : Promise.resolve([]),
		enabled: true,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Search orders</h1>
				<nav style={{ display: "flex", gap: "1rem" }}>
					<Link to="/">Home</Link>
					<Link to="/orders">Orders</Link>
				</nav>
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
};

export const OrderDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const orderId = id ?? "";
	const { data: order, isLoading, error } = useOrder(orderId);

	if (!orderId)
		return (
			<div className={styles.container}>
				<p>Invalid order ID.</p>
				<Link to="/orders">Back to orders</Link>
			</div>
		);
	if (isLoading) return <div className={styles.container}>Loading…</div>;
	if (error || !order)
		return (
			<div className={styles.container}>
				<p>Order not found.</p>
				<Link to="/orders">Back to orders</Link>
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Order #{order.order_number}</h1>
				<Link to="/orders">Back to orders</Link>
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
