import styles from "styles/orderDetails.module.scss";
import type { OrderType } from "behavior/orders";
import RoundedInput from "components/inputs/RoundedInput";
import RoundedDateInput from "components/inputs/RoundedDateInput";

type CustomerSectionProps = {
	orderType: OrderType;
	form: {
		customer_name: string;
		customer_phone: string;
		school_city: string;
		school_name: string;
		release_date: string;
	};
	onChange: (updates: Partial<CustomerSectionProps["form"]>) => void;
};

const CustomerSection = ({ orderType, form, onChange }: CustomerSectionProps) => {
	const showSchool = orderType === "graduation";

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Замовниця</h2>
			<div className={styles.sectionGrid}>
				<RoundedInput
					label="ПІБ"
					placeholder="ПІБ"
					value={form.customer_name}
					onChange={(e) => onChange({ customer_name: e.target.value })}
				/>
				<RoundedInput
					label="Номер телефону"
					placeholder="Номер телефону"
					value={form.customer_phone}
					onChange={(e) => onChange({ customer_phone: e.target.value })}
				/>
				{showSchool && (
					<>
						<RoundedInput
							label="Місто"
							placeholder="Місто"
							value={form.school_city}
							onChange={(e) => onChange({ school_city: e.target.value })}
						/>
						<RoundedInput
							label="Школа"
							placeholder="Школа / учбовий заклад"
							value={form.school_name}
							onChange={(e) => onChange({ school_name: e.target.value })}
						/>
					</>
				)}
				<RoundedDateInput
					label="Дата свята"
					value={form.release_date}
					onChange={(release_date) => onChange({ release_date })}
					placeholder="дд/мм/рррр"
				/>
			</div>
		</section>
	);
};

export default CustomerSection;
