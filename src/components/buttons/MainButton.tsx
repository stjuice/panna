import styles from "./buttons.module.scss";
import Button from "./Button";

type MainButtonProps = {
	to?: string;
	size?: "default" | "small";
	onClick?: () => void;
	children: React.ReactNode;
};

const MainButton = ({ to, size, onClick, children }: MainButtonProps) => {
	return (
		<Button to={to} size={size} onClick={onClick} className={styles.main}>
			{children}
		</Button>
	);
};

export default MainButton;
