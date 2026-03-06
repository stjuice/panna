import styles from "./buttons.module.scss";
import Button from "./Button";

type SecondaryButtonProps = {
	to?: string;
	size?: "default" | "small";
	onClick?: () => void;
	children: React.ReactNode;
};

const SecondaryButton = ({ to, size, onClick, children }: SecondaryButtonProps) => {
	return (
		<Button to={to} size={size} onClick={onClick} className={styles.secondary}>
			{children}
		</Button>
	);
};

export default SecondaryButton;
