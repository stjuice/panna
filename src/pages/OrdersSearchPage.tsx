import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchOrders } from "@/api/orders.api";
import OrderTable from "@/components/orders/OrderTable";
import styles from "@/styles/search.module.scss";
import BackButton from "@/components/buttons/BackButton";

const OrdersSearchPage = () => {
	const [query, setQuery] = useState("");

	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["orders-search", query],
		queryFn: () =>
			query.trim() ? searchOrders(query.trim()) : Promise.resolve([]),
		enabled: true,
	});

	return (
		<div className={styles.page}>
			<div className={styles.topBar}>
				<BackButton to="/" text="Назад"/>
				<h1 className={styles.pageTitle}>Пошук замовлення</h1>
			</div>
			<div className={styles.searchWrapper}>
				<input
					type="search"
					className={styles.searchInput}
					placeholder="ПІБ | номер телефону | учбовий заклад"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<span className={styles.searchIcon}>🔍</span>
			</div>
			{query.trim() && (
				<div className={styles.resultCount}>
					{orders.length} знайдено
				</div>
			)}
			{isLoading
				? <div style={{ textAlign: "center" }}>Завантаження…</div>
				: orders.length > 0 && <OrderTable orders={orders} />
			}
		</div>
	);
};

export default OrdersSearchPage;
