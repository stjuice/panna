import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { OrderFlat } from "@/behavior/orders/types";
import { formatDate } from "@/lib/formatDate";
import styles from "@/styles/search.module.scss";
import DetailsButton from "../buttons/DetailsButton";

type OrderTableProps = {
  orders: OrderFlat[];
};

const statusClass: Record<string, string> = {
  new: styles.statusNew,
  fitting: styles.statusFitting,
  released: styles.statusReleased,
  cancelled: styles.statusCancelled,
};

const OrderTable = ({ orders }: OrderTableProps) => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.orderList}>
      
      <div className={styles.tableHead}>
        <div>Ім'я</div>
        <div>Тип</div>
        <div>Статус</div>
        <div>Дата видачі</div>
      </div>

      {orders.map(order => {
        const expanded = expandedId === order.order_id;

        return (
          <div
            key={order.order_id}
            className={`${styles.rowCard} ${expanded ? styles.rowExpandedCard : ""}`}
          >

            <div
              className={`${styles.rowHeader} ${expanded ? styles.rowExpandedHeader : ""}`}
              onClick={() => toggleRow(order.order_id)}
            >
              <div className={styles.nameCell}>{order.customer_name}</div>

              <div>{order.type}</div>

              <div className={statusClass[order.status] ?? ""}>
                {order.status}
              </div>

              <div>
                <span className="numero">{formatDate(order.release_date)}</span>
              </div>
            </div>

            {expanded && (
              <div className={styles.rowExpanded}>
                <div className={styles.infoGrid}>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Номер:</span>
                    <span className="numero">{order.customer_phone}</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Ціна:</span>
                    <span className="numero">{order.price ?? "—"} грн</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Місто:</span>
                    <span>{order.school_city ?? "—"}</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Аванс:</span>
                    <span className="numero">{order.deposit ?? "—"} грн</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Школа:</span>
                    <span>{order.school_name ?? "—"}</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Очікує:</span>
                    <span className="numero">{order.remaining ?? "—"} грн</span>
                  </div>
              
                </div>
              
                <div className={styles.detailsWrapper}>
                  <DetailsButton orderId={order.order_id} />
                </div>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default OrderTable;
