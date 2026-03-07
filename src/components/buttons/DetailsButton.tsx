import styles from "./buttons.module.scss";
import Button from "./Button";

type DetailsButtonProps = {
	orderId: string;
	searchQuery?: string;
	expandedIdForReturn?: string;
	onClick?: () => void;
};

const DetailsButton = ({
	orderId,
	searchQuery,
	expandedIdForReturn,
	onClick,
}: DetailsButtonProps) => {
	const params = new URLSearchParams();
	if (searchQuery) params.set("q", searchQuery);
	if (expandedIdForReturn) params.set("expanded", expandedIdForReturn);
	const search = params.toString();
	const to = search ? `/orders/${orderId}?${search}` : `/orders/${orderId}`;

	return (
		<Button to={to} size="small" onClick={onClick} className={styles.details}>
			Деталі
		</Button>
	);
};

export default DetailsButton;
