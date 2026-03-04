import { Link } from "react-router-dom";
import styles from "@/styles/orders.module.scss";
import type { Order } from "@/types/orders";

export type OrderListProps = {
  orders: Order[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <Link key={order.ID} to={`/order/${order.ID}`} className={styles.card} style={{ display: "block" }}>
          <div className={styles.itemHeader}>
            <div className={styles.name}>{order.CustomerName}</div>
            <div className={styles.id}>#{order.ID}</div>
          </div>
          <div className={styles.meta}>
            <span>{order.CreatedDate}</span>
            {` · `}
            <span>{order.CustomerPhoneNumber}</span>
          </div>
          <div className={styles.details}>{order.Details}</div>
        </Link>
      ))}
    </div>
  );
}
