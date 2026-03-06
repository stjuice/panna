import styles from "./buttons.module.scss";
import Button from "./Button";

type DetailsButtonProps = {
	orderId: string;
	onClick?: () => void;
};

const DetailsButton = ({ orderId, onClick }: DetailsButtonProps) => {
	return (
		<Button to={`/orders/${orderId}`} size={"small"} onClick={onClick} className={styles.details}>
			Деталі
		</Button>
	);
};

export default DetailsButton;
