import styles from "styles/search.module.scss";
import type { OrderFlat } from "behavior/orders";
import { ORDER_TYPE_LABEL } from "behavior/orders";
import { formatDate } from "lib/formatDate";
import ExpandedCard from "./ExpandedCard";
import { Field } from "./Field";

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
              <Field
                label="Опис"
                value={order.description ?? "—"}
                classNameField={`${styles.mobileField}`}
                classNameLabel={styles.mobileLabel}
              />

              <Field
                label="Тип"
                value={ORDER_TYPE_LABEL[order.type]}
                classNameField={styles.mobileField}
                classNameLabel={styles.mobileLabel}
              />

              <Field
                label="Школа"
                value={order.school_name ?? "—"}
                classNameField={styles.mobileField}
                classNameLabel={styles.mobileLabel}
              />

              <Field
                label="Наступний візит"
                value={formatDate(order.next_visit_date)}
                classNameField={styles.mobileField}
                classNameLabel={styles.mobileLabel}
              />
            </div>

            {expanded && <ExpandedCard order={order} searchQuery={searchQuery} />}

          </div>
        );
      })}
    </div>
  );
};

export default OrderTable;
