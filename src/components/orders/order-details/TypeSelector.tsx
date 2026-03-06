import type { OrderType } from "@/behavior/orders/types";
import { ORDER_TYPE_LABEL } from "@/behavior/orders/types";
import SelectButton from "@/components/buttons/SelectButton";
import styles from "@/styles/orderDetails.module.scss";

const TYPE_OPTIONS = (Object.entries(ORDER_TYPE_LABEL) as [OrderType, string][]).map(
	([value, label]) => ({ value, label }),
);

type TypeSelectorProps = {
	value: string;
	onChange: (value: string) => void;
};

const TypeSelector = ({ value, onChange }: TypeSelectorProps) => {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Тип замовлення</h2>
			<div className={styles.typeSelector}>
				{TYPE_OPTIONS.map((t) => (
					<SelectButton
            value={value}
						type={t}
						onChange={(value) => onChange(value)}
						key={t.value}
					/>
				))}
			</div>
		</section>
	);
};

export default TypeSelector;
