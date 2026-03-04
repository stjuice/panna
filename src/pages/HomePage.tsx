import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getOrdersRepository } from "@/lib/orders/factory";
import OrderList from "@/components/orders/OrderList";
import styles from "@/styles/orders.module.scss";

const repo = getOrdersRepository();

export default function HomePage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => repo.getOrders(),
  });

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
