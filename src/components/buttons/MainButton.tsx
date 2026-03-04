import styles from "./buttons.module.scss";
import Button from "./Button";

type MainButtonProps = {
	to?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

const MainButton = ({ to, onClick, children }: MainButtonProps) => {
	return (
		<Button to={to} onClick={onClick} className={styles.main}>
			{children}
		</Button>
	);
};

export default MainButton;
