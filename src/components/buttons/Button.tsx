import { Link } from "react-router-dom";
import styles from "./buttons.module.scss";

type ButtonSize = "default" | "medium" | "small";

type ButtonProps = {
	to?: string;
	className?: string;
	size?: ButtonSize;
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
};

const wrapperClass: Record<ButtonSize, string> = {
	default: styles.wrapper,
	medium: styles.wrapperMedium,
	small: styles.wrapperSmall,
};

const Button = ({
	to,
	className,
	size = "default",
	onClick,
	disabled,
	children,
}: ButtonProps) => {
	const inner = to ? (
		<Link to={to} className={className}>
			{children}
		</Link>
	) : (
		<button
			type="button"
			className={className}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);

	return <div className={wrapperClass[size]}>{inner}</div>;
};

export default Button;
