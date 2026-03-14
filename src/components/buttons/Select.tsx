import styles from "./buttons.module.scss";
import Button from "./Button";

type SelectButtonProps = {
	value: string;
	onChange: (value: string) => void;
	type: {
		value: string;
		label: string;
	};
};

const Select = ({
	value,
	onChange,
	type,
}: SelectButtonProps) => {
  const className = value === type.value ? styles.main : styles.secondary;

	return <Button key={type.value} className={className} onClick={() => onChange(type.value)} size="medium">{type.label}</Button>;
};

export default Select;
