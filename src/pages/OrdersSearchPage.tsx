import styles from "@/styles/search.module.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLastModifiedOrders, searchOrders } from "@/api/orders.api";
import OrderTable from "@/components/orders/OrderTable";
import BackButton from "@/components/buttons/BackButton";

const SEARCH_PARAM_Q = "q";
const SEARCH_PARAM_EXPANDED = "expanded";
const LAST_MODIFIED_LIMIT = 5;

const OrdersSearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const qFromUrl = searchParams.get(SEARCH_PARAM_Q) ?? "";
	const expandedFromUrl = searchParams.get(SEARCH_PARAM_EXPANDED) ?? "";

	const [query, setQuery] = useState(qFromUrl);
	const [expandedId, setExpandedId] = useState<string | null>(expandedFromUrl || null);

	useEffect(() => {
		setQuery(qFromUrl);
		setExpandedId(expandedFromUrl || null);
	}, [qFromUrl, expandedFromUrl]);

	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["orders-search", query.trim()],
		queryFn: () =>
			query.trim()
				? searchOrders(query.trim())
				: fetchLastModifiedOrders(LAST_MODIFIED_LIMIT),
		enabled: true,
	});

	const handleQueryChange = (value: string) => {
		setQuery(value);
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value) next.set(SEARCH_PARAM_Q, value);
			else next.delete(SEARCH_PARAM_Q);
			return next;
		}, { replace: true });
	};

	const handleExpandedIdChange = (id: string | null) => {
		setExpandedId(id);
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (id) next.set(SEARCH_PARAM_EXPANDED, id);
			else next.delete(SEARCH_PARAM_EXPANDED);
			return next;
		}, { replace: true });
	};

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
					onChange={(e) => handleQueryChange(e.target.value)}
				/>
				<span className={styles.searchIcon}>🔍</span>
			</div>
			{query.trim() ? (
				<div className={styles.resultCount}>
					Знайдено замовлень:&nbsp;&nbsp;<span className={styles.numeric}>{orders.length}</span>
				</div>
			) : (
				<div className={styles.resultCount}>
					Останні&nbsp;<span className={styles.numeric}>{LAST_MODIFIED_LIMIT}</span>&nbsp;замовлень
				</div>
			)}
			{isLoading
				? <div style={{ textAlign: "center" }}>Завантаження…</div>
				: orders.length > 0 && (
					<OrderTable
						orders={orders}
						searchQuery={query}
						expandedId={expandedId}
						onExpandedIdChange={handleExpandedIdChange}
					/>
				)
			}
		</div>
	);
};

export default OrdersSearchPage;
