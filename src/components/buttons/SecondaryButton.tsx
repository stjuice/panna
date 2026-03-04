import styles from "./buttons.module.scss";
import Button from "./Button";

type SecondaryButtonProps = {
	to?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

const SecondaryButton = ({ to, onClick, children }: SecondaryButtonProps) => {
	return (
		<Button to={to} onClick={onClick} className={styles.secondary}>
			{children}
		</Button>
	);
};

export default SecondaryButton;
