import { Link } from "react-router-dom";
import styles from "./buttons.module.scss";

type ButtonSize = "default" | "small";

type ButtonProps = {
	to?: string;
	className?: string;
	size?: ButtonSize;
	onClick?: () => void;
	children: React.ReactNode;
};

const wrapperClass: Record<ButtonSize, string> = {
	default: styles.wrapper,
	small: styles.wrapperSmall,
};

const Button = ({ to, className, size = "default", onClick, children }: ButtonProps) => {
	const inner = to ? (
		<Link to={to} className={className}>
			{children}
		</Link>
	) : (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);

	return <div className={wrapperClass[size]}>{inner}</div>;
};

export default Button;
