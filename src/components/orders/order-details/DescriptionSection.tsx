import styles from "styles/orderDetails.module.scss";

type DescriptionSectionProps = {
	value: string;
	onChange: (value: string) => void;
};

const DescriptionSection = ({ value, onChange }: DescriptionSectionProps) => {
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
		</section>
	);
};

export default DescriptionSection;
