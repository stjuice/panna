import styles from "styles/orderDetails.module.scss";
import RoundedDateInput from "components/inputs/RoundedDateInput";

type DescriptionSectionProps = {
	value: string;
	onChange: (value: string) => void;
	nextVisitDate: string;
	onNextVisitDateChange: (value: string) => void;
};

const DescriptionSection = ({
	value,
	onChange,
	nextVisitDate,
	onNextVisitDateChange,
}: DescriptionSectionProps) => {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Опис</h2>
			<textarea
				className={styles.textarea}
				placeholder="Опис замовлення"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={3}
			/>
			<div className={styles.fittingDateSection}>
				<RoundedDateInput
					label="Дата примірки"
					value={nextVisitDate}
					onChange={onNextVisitDateChange}
					placeholder="дд/мм/рррр"
				/>
			</div>
		</section>
	);
};

export default DescriptionSection;
