import { useNavigate } from "react-router-dom";
import MainButton from "@/components/buttons/MainButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import styles from "@/styles/orderDetails.module.scss";
import ActionLink from "@/components/buttons/ActionLink";

type OrderDetailsActionsProps = {
	onSave: () => void;
	onCancelOrder: () => void;
	isSaving?: boolean;
	/** When true (create mode), "Скасувати замовлення" is hidden. */
	isCreateMode?: boolean;
	/** Where to navigate on Cancel / Back (e.g. /search?q=...). */
	backToSearch?: string;
};

const OrderDetailsActions = ({
	onSave,
	onCancelOrder,
	isSaving = false,
	isCreateMode = false,
	backToSearch = "/search",
}: OrderDetailsActionsProps) => {
	const navigate = useNavigate();

	return (
		<section className={styles.actionsSection}>
			<div className={styles.actions}>
				<SecondaryButton onClick={() => navigate(backToSearch)} size="medium">
					Скасувати
				</SecondaryButton>
				<MainButton onClick={onSave} disabled={isSaving} size="medium">
					{isSaving ? "Збереження…" : "Зберегти"}
				</MainButton>
			</div>
			{!isCreateMode && (
				<div>
					<ActionLink className={styles.deleteButton} onClick={onCancelOrder}>
						Скасувати замовлення
					</ActionLink>
				</div>
			)}
		</section>
	);
};

export default OrderDetailsActions;

