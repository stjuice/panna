import styles from "./buttons.module.scss";
import Button from "./Button";

type CreateNewButtonProps = {
	to?: string;
	size?: "default" | "medium" | "small";
	onClick?: () => void;
	text?: string;
};

const CreateNew = ({ to, size = "small", onClick, text = "Нове" }: CreateNewButtonProps) => {
	return (
		<div className={styles.createContainer}>
			<Button to={to} size={size} onClick={onClick} className={styles.compact}>
				{text}
			  <span className={styles.plus}>+</span>
			</Button>
		</div>
	);
};

export default CreateNew;
