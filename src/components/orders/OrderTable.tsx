import type { OrderFlat } from "behavior/orders/types";
import { ORDER_TYPE_LABEL } from "behavior/orders/types";
import { formatDate } from "lib/formatDate";
import styles from "styles/search.module.scss";
import { DetailsButton } from "../buttons";

type OrderTableProps = {
  orders: OrderFlat[];
  searchQuery?: string;
  expandedId?: string | null;
  onExpandedIdChange?: (id: string | null) => void;
};

const OrderTable = ({
  orders,
  searchQuery = "",
  expandedId = null,
  onExpandedIdChange,
}: OrderTableProps) => {
  const toggleRow = (id: string) => {
    onExpandedIdChange?.(expandedId === id ? null : id);
  };

  return (
    <div className={styles.orderList}>
      
      <div className={styles.tableHead}>
        <div>Опис</div>
        <div>Тип</div>
        <div>Школа</div>
        <div>Наступний візит</div>
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
              <div className={`${styles.mobileField} ${styles.descCell}`}>
                <span className={styles.mobileLabel}>Опис</span>
                <span>{order.description ?? "—"}</span>
              </div>

              <div className={styles.mobileField}>
                <span className={styles.mobileLabel}>Тип</span>
                <span>{ORDER_TYPE_LABEL[order.type]}</span>
              </div>

              <div className={styles.mobileField}>
                <span className={styles.mobileLabel}>Школа</span>
                <span>{order.school_name ?? "—"}</span>
              </div>

              <div className={styles.mobileField}>
                <span className={styles.mobileLabel}>Наступний візит</span>
                <span>{formatDate(order.next_visit_date)}</span>
              </div>
            </div>

            {expanded && (
              <div className={styles.rowExpanded}>
                <div className={styles.infoGrid}>           
                  <div className={styles.field}>
                    <span className={styles.label}>Місто:</span>
                    <span>{order.school_city ?? "—"}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Школа:</span>
                    <span>{order.school_name ?? "—"}</span>
                  </div>
              
                 {/* Uncomment when payment functionality is implemented

                 <div className={styles.field}>
                    <span className={styles.label}>Очікує:</span>
                    <span>{order.remaining ?? "—"} грн</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Ціна:</span>
                    <span>{order.price ?? "—"} грн</span>
                  </div>
              
                  <div className={styles.field}>
                    <span className={styles.label}>Аванс:</span>
                    <span>{order.deposit ?? "—"} грн</span>
                  </div>*/}
                           
                <div className={styles.detailsWrapper}>
                  <DetailsButton
                    orderId={order.order_id}
                    searchQuery={searchQuery}
                    expandedIdForReturn={order.order_id}
                  />
                </div>
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
