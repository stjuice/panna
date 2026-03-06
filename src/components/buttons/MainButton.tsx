import styles from "./buttons.module.scss";
import Button from "./Button";

type MainButtonProps = {
	to?: string;
	size?: "default" | "medium" | "small";
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
};

const MainButton = ({ to, size, onClick, disabled, children }: MainButtonProps) => {
	return (
		<Button
			to={to}
			size={size}
			onClick={onClick}
			disabled={disabled}
			className={styles.main}
		>
			{children}
		</Button>
	);
};

export default MainButton;
