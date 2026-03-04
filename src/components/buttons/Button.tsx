import { Link } from "react-router-dom";

type ButtonProps = {
	to?: string;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

const Button = ({ to, className, onClick, children }: ButtonProps) => {
	if (to) {
		return (
			<Link to={to} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
