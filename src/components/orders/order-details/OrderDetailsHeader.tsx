import BackButton from "@/components/buttons/BackButton";
import styles from "@/styles/orderDetails.module.scss";

type OrderDetailsHeaderProps = {
	orderNumber: number;
	status: string;
	onStatusChange: (status: string) => void;
};

const STATUS_OPTIONS = [
	{ value: "new", label: "нове" },
	{ value: "fitting", label: "примірка" },
	{ value: "released", label: "видано" },
	{ value: "cancelled", label: "скасовано" },
];

const OrderDetailsHeader = ({
	orderNumber,
	status,
	onStatusChange,
}: OrderDetailsHeaderProps) => {
	return (
		<div className={styles.header}>
			<BackButton to="/search" text="Назад" />
			<div className={styles.headerCenter}>
				<h1 className={styles.orderTitle}>
					Замовлення <span className="numero">№{orderNumber}</span>
				</h1>
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
