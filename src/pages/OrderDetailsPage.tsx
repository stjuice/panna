import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrdersRepository } from "@/lib/orders/factory";
import styles from "@/styles/orders.module.scss";

const repo = getOrdersRepository();

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = id ? parseInt(id, 10) : NaN;

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => repo.getOrder(orderId),
    enabled: Number.isFinite(orderId),
  });

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
        <h1 className={styles.title}>Order #{order.ID}</h1>
        <Link to="/">Back to list</Link>
      </div>
      <div className={styles.card}>
        <div className={styles.itemHeader}>
          <div className={styles.name}>{order.CustomerName}</div>
          <div className={styles.id}>#{order.ID}</div>
        </div>
        <div className={styles.meta}>
          <span>{order.CreatedDate}</span>
          {" · "}
          <span>{order.CustomerPhoneNumber}</span>
        </div>
        <div className={styles.details}>{order.Details}</div>
      </div>
    </div>
  );
}
