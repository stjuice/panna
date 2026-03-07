import RoundedInput from "@/components/inputs/RoundedInput";
import styles from "@/styles/orderDetails.module.scss";

type PaymentSectionProps = {
	price: number | "";
	deposit: number | "";
	onChange: (updates: { price?: number | ""; deposit?: number | "" }) => void;
};

const PaymentSection = ({ price, deposit, onChange }: PaymentSectionProps) => {
	const remaining = (Number(price) || 0) - (Number(deposit) || 0);

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Інформація про оплату</h2>
			<div className={styles.paymentSection}>
				<RoundedInput
					label="Повна ціна"
					type="number"
					min={0}
					value={price === "" ? "" : price}
					onChange={(e) =>
						onChange({
							price: e.target.value === "" ? "" : Number(e.target.value),
						})
					}
				/>
				<RoundedInput
					label="Завдаток"
					type="number"
					min={0}
					value={deposit === "" ? "" : deposit}
					onChange={(e) =>
						onChange({
							deposit: e.target.value === "" ? "" : Number(e.target.value),
						})
					}
				/>
				<div className={styles.remaining}>
					<h2 className={styles.sectionTitle}>Залишок: {remaining} грн</h2>
				</div>
			</div>
		</section>
	);
};

export default PaymentSection;
