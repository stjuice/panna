import { useNavigate } from "react-router-dom";
import type { OrderFlat } from "@/behavior/orders/types";
import styles from "@/styles/search.module.scss";

type OrderTableProps = {
	orders: OrderFlat[];
};

const statusClass: Record<string, string> = {
	new: styles.statusNew,
	fitting: styles.statusFitting,
	released: styles.statusReleased,
	cancelled: styles.statusCancelled,
};

const formatDate = (date?: string) => {
	if (!date) return "—";
	const d = new Date(date);
	const dd = String(d.getDate()).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const yyyy = d.getFullYear();
	return `${dd}/${mm}/${yyyy}`;
};

const OrderTable = ({ orders }: OrderTableProps) => {
	const navigate = useNavigate();

	return (
		<table className={styles.table}>
			<thead>
				<tr className={styles.tableHead}>
					<th>Ім'я</th>
					<th>Тип</th>
					<th>Статус</th>
					<th>Дата видачі</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr
						key={order.order_id}
						className={styles.tableRow}
						onClick={() => navigate(`/order/${order.order_id}`)}
					>
						<td>{order.customer_name}</td>
						<td>{order.type}</td>
						<td className={statusClass[order.status] ?? ""}>
							{order.status}
						</td>
						<td>{formatDate(order.release_date)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default OrderTable;
