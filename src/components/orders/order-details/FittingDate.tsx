import RoundedDateInput from "components/inputs/RoundedDateInput";
import styles from "styles/orderDetails.module.scss";

type FittingDateProps = {
	value: string;
	onChange: (value: string) => void;
};

const FittingDate = ({ value, onChange }: FittingDateProps) => { // TODO: improve and reuse this component
	return (
		<section className={`${styles.section} ${styles.fittingDateSection}`}>
			<h2 className={styles.sectionTitle}>Дата примірки</h2>
			<div className={styles.sectionGrid}>
				<RoundedDateInput
					label=""
					value={value}
					onChange={onChange}
					placeholder="дд/мм/рррр"
				/>
			</div>
		</section>
	);
};

export default FittingDate;
