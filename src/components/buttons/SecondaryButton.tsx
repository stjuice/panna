import styles from "./buttons.module.scss";
import Button from "./Button";

type SecondaryButtonProps = {
	to?: string;
	size?: "default" | "medium" | "small";
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
};

const SecondaryButton = ({
	to,
	size,
	onClick,
	disabled,
	children,
}: SecondaryButtonProps) => {
	return (
		<Button
			to={to}
			size={size}
			onClick={onClick}
			disabled={disabled}
			className={styles.secondary}
		>
			{children}
		</Button>
	);
};

export default SecondaryButton;
