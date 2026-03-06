import styles from "./inputs.module.scss";

type RoundedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const RoundedInput = ({ label, className, ...props }: RoundedInputProps) => {
	const input = (
		<input
			className={`${styles.roundedInput} ${className ?? ""}`.trim()}
			{...props}
		/>
	);

	if (label) {
		return (
			<div className={styles.field}>
				<label className={styles.label}>{label}</label>
				{input}
			</div>
		);
	}

	return input;
};

export default RoundedInput;
