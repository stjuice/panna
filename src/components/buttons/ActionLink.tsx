type ActionLinkProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
};

const ActionLink = ({
	onClick,
	children,
	className,
}: ActionLinkProps) => {
	return (
		<button
			type="button"
			className={className}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default ActionLink;
