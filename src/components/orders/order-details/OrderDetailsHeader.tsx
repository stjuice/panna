import type { OrderStatus } from "@/behavior/orders/types";
import { ORDER_STATUS_LABEL } from "@/behavior/orders/types";
import BackButton from "@/components/buttons/BackButton";
import styles from "@/styles/orderDetails.module.scss";
import { useState } from "react";

type OrderDetailsHeaderProps = {
	title: string;
	status: OrderStatus;
	onStatusChange: (status: OrderStatus) => void;
	/** Back button target (e.g. /search?q=... to preserve search state). */
	backTo?: string;
};

const STATUS_OPTIONS = (Object.entries(ORDER_STATUS_LABEL) as [OrderStatus, string][]).map(
	([value, label]) => ({ value, label }),
);

const OrderDetailsHeader = ({
	title,
	status,
	onStatusChange,
	backTo = "/search",
}: OrderDetailsHeaderProps) => {
  const [triggered, setTriggered] = useState<boolean>(false);

  const onStatusClick = () => 
    setTriggered(!triggered);

  const onClick = (value: string) => {
    onStatusChange(value as OrderStatus);
  };

  const onStatusBlur = () => {
    setTriggered(!triggered);
  };

	return (
		<div className={styles.header}>
			<BackButton to={backTo} text="До списку замовлень" />
			<div className={styles.headerCenter}>
				<h1 className={styles.orderTitle}>{title}</h1>
				<div className={styles.statusRow}>
					<span className={styles.statusLabel}>Статус:</span>
					<div className={styles.statusValue}>{!triggered ? (
						<span
							role="button"
							className={styles.statusValue}
							onClick={onStatusClick}
              onBlur={onStatusBlur}
						>
							{ORDER_STATUS_LABEL[status]}
						</span>
					) : (
						<select
							className={styles.statusSelect}
							value={status}
							onChange={(e) => onClick(e.target.value)}
              onBlur={onStatusBlur}
						>
							{STATUS_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
