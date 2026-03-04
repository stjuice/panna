import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getOrdersRepository } from "@/lib/orders/factory";
import OrderList from "@/components/orders/OrderList";
import styles from "@/styles/orders.module.scss";

const repo = getOrdersRepository();

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => repo.getOrders(),
  });

  const filtered =
    !query.trim()
      ? orders
      : orders.filter(
          (o) =>
            o.CustomerName.toLowerCase().includes(query.toLowerCase()) ||
            o.Details.toLowerCase().includes(query.toLowerCase()) ||
            o.CustomerPhoneNumber.includes(query),
        );

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
      {isLoading ? (
        <div>Loading…</div>
      ) : (
        <OrderList orders={filtered} />
      )}
    </div>
  );
}
