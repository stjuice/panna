import { toDisplayDate, parseDisplayDate } from "@/lib/formatDate";
import RoundedInput from "./RoundedInput";

type RoundedDateInputProps = {
	value: string;
	onChange: (isoDate: string) => void;
	label?: string;
	placeholder?: string;
};

const RoundedDateInput = ({
	value,
	onChange,
	label = "Дата",
	placeholder = "дд/мм/рррр",
}: RoundedDateInputProps) => {
	const displayValue = toDisplayDate(value || "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const next = parseDisplayDate(e.target.value);
		onChange(next);
	};

	return (
		<RoundedInput
			label={label}
			type="text"
			inputMode="numeric"
			placeholder={placeholder}
			value={displayValue}
			onChange={handleChange}
		/>
	);
};

export default RoundedDateInput;
