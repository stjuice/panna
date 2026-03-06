import { useState, useEffect, useRef } from "react";
import { toDisplayDate, parseDisplayDate } from "@/lib/formatDate";
import RoundedInput from "./RoundedInput";

type RoundedDateInputProps = {
	value: string;
	onChange: (isoDate: string) => void;
	label?: string;
	placeholder?: string;
};

const formatDateInput = (digits: string) => {
	const parts = [];

	if (digits.length > 0) parts.push(digits.slice(0, 2));
	if (digits.length > 2) parts.push(digits.slice(2, 4));
	if (digits.length > 4) parts.push(digits.slice(4, 8));

	return parts.join("/");
};

const RoundedDateInput = ({
	value,
	onChange,
	label = "Дата",
	placeholder = "дд/мм/рррр",
}: RoundedDateInputProps) => {
	const [localDisplay, setLocalDisplay] = useState(() =>
		toDisplayDate(value || "")
	);

	const prevValueRef = useRef(value);

	useEffect(() => {
		if (prevValueRef.current !== value) {
			prevValueRef.current = value;
			setLocalDisplay(toDisplayDate(value || ""));
		}
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// keep only digits
		const digits = e.target.value.replace(/\D/g, "").slice(0, 8);

		const formatted = formatDateInput(digits);
		setLocalDisplay(formatted);

		const parsed = parseDisplayDate(formatted);
		if (parsed) onChange(parsed);
	};

	return (
		<RoundedInput
			label={label}
			type="text"
			inputMode="numeric"
			placeholder={placeholder}
			value={localDisplay}
			onChange={handleChange}
		/>
	);
};

export default RoundedDateInput;
