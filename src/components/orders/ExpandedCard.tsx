import styles from "styles/search.module.scss";
import type { OrderFlat } from "behavior/orders";
import { DetailsButton } from "../buttons";
import { Field } from "./Field";

type ExpandedCardProps = {
  order: OrderFlat;
  searchQuery?: string;
};

const ExpandedCard = ({
  order,
  searchQuery
}: ExpandedCardProps) => (
  <div className={styles.rowExpanded}>
    <div className={styles.infoGrid}>
      <Field label="Місто:" value={order.school_city ?? "—"} />
      <Field label="Школа:" value={order.school_name ?? "—"} />
      <div className={styles.detailsWrapper}>
        <DetailsButton  
          orderId={order.order_id}
          searchQuery={searchQuery}
          expandedIdForReturn={order.order_id}
        />
      </div>
    </div>
  </div>
);

export default ExpandedCard;
