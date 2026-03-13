import styles from "./buttons.module.scss";
import Button from "./Button";

type CreateNewButtonProps = {
	to?: string;
	size?: "default" | "medium" | "small";
	onClick?: () => void;
	text?: string;
};

const CreateNewButton = ({ to, size = "small", onClick, text = "Нове" }: CreateNewButtonProps) => {
	return (
		<div className={styles.createContainer}>
			<Button to={to} size={size} onClick={onClick} className={styles.compact}>
				{text}
			</Button>
			<span className={styles.plus}>+</span>
		</div>
	);
};

export default CreateNewButton;
