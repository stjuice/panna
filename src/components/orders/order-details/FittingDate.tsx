import RoundedDateInput from "components/inputs/RoundedDateInput";
import styles from "styles/orderDetails.module.scss";

type FittingDateProps = {
	value: string;
	onChange: (value: string) => void;
};

const FittingDate = ({ value, onChange }: FittingDateProps) => {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Дата примірки</h2>
			<RoundedDateInput
				label=""
				value={value}
				onChange={onChange}
				placeholder="дд/мм/рррр"
			/>
		</section>
	);
};

export default FittingDate;
