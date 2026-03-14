import styles from "./schoolTypeahead.module.scss";
import { useEffect, useState } from "react";
import { searchSchools } from "api/schools.api";
import { School } from "behavior/schools/types";
import RoundedInput from "components/inputs/RoundedInput";
import { useDebounce } from "./useDebounce";

type Props = {
	value: string;
	onChange: (value: string) => void;
	onSelect?: (school: School) => void;
};

export const SchoolTypeahead = ({ value, onChange, onSelect }: Props) => {
	const [results, setResults] = useState<School[]>([]);
	const [open, setOpen] = useState(false);

	const debounced = useDebounce(value, 250);

	useEffect(() => {
		const run = async () => {
			if (!debounced) {
				setResults([]);
				return;
			}

			const schools = await searchSchools(debounced);
			setResults(schools);
			setOpen(true);
		};

		run();
	}, [debounced]);

	const select = (school: School) => {
		onChange(school.name);
		onSelect?.(school);
		setOpen(false);
	};
  
	return (
		<div className={styles.wrapper}>
			<RoundedInput
				label="Школа"
				placeholder="Школа / учбовий заклад"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>

			{open && results.length > 0 && (
				<div className={styles.dropdown}>
					{results.map((s) => (
						<div
							key={s.id}
							className={styles.item}
							onClick={() => select(s)}
						>
							<div>{s.name}</div>
							<div className={styles.city}>{s.city}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
