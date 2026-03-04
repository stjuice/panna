import { Link } from "react-router-dom";
import styles from "@/styles/orders.module.scss";
import type { OrderFlat } from "@/types/orders";

export type OrderListProps = {
  orders: OrderFlat[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <Link key={order.order_id} to={`/order/${order.order_id}`} className={styles.card} style={{ display: "block" }}>
          <div className={styles.itemHeader}>
            <div className={styles.name}>{order.customer_name}</div>
            <div className={styles.id}>#{order.order_id}</div>
          </div>
          <div className={styles.meta}>
            <span>{order.created_at?.split("T")[0]}</span>
            {order.customer_phone && <>{` · `}<span>{order.customer_phone}</span></>}
            {order.school_name && <>{` · `}<span>{order.school_name}</span></>}
          </div>
          <div className={styles.meta}>
            <span>{order.type}</span>
            {` · `}
            <span>{order.status}</span>
            {order.price != null && <>{` · `}<span>${order.price}</span></>}
          </div>
          {order.description && <div className={styles.details}>{order.description}</div>}
        </Link>
      ))}
    </div>
  );
}
