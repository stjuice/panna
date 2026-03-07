import type { OrderStatus } from "@/behavior/orders/types";
import { ORDER_STATUS_LABEL } from "@/behavior/orders/types";
import BackButton from "@/components/buttons/BackButton";
import styles from "@/styles/orderDetails.module.scss";

type OrderDetailsHeaderProps = {
	title: string;
	status: string;
	onStatusChange: (status: string) => void;
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
	return (
		<div className={styles.header}>
			<BackButton to={backTo} text="Назад" />
			<div className={styles.headerCenter}>
				<h1 className={styles.orderTitle}>{title}</h1>
				<div className={styles.statusRow}>
					<span className={styles.statusLabel}>Статус:</span>
					<select
						className={styles.statusSelect}
						value={status}
						onChange={(e) => onStatusChange(e.target.value)}
					>
						{STATUS_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailsHeader;
