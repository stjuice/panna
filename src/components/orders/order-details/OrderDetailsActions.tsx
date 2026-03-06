import { useNavigate } from "react-router-dom";
import MainButton from "@/components/buttons/MainButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import styles from "@/styles/orderDetails.module.scss";
import ActionLink from "@/components/buttons/ActionLink";

type OrderDetailsActionsProps = {
	onSave: () => void;
  onCancelOrder: () => void;
	isSaving?: boolean;
};

const OrderDetailsActions = ({
	onSave,
	isSaving = false,
  onCancelOrder,
}: OrderDetailsActionsProps) => {
	const navigate = useNavigate();

	return (
		<section className={styles.actionsSection}>
			<div className={styles.actions}>
				<SecondaryButton onClick={() => navigate("/search")} size="medium">
					Скасувати
				</SecondaryButton>
				<MainButton onClick={onSave} disabled={isSaving} size="medium">
					{isSaving ? "Збереження…" : "Зберегти"}
				</MainButton>
			</div>
      <div>
				<ActionLink className={styles.deleteButton} onClick={onCancelOrder}>
					Скасувати замовлення
				</ActionLink>
			</div>
		</section>
	);
};

export default OrderDetailsActions;
function setFormUpdates(arg0: { status: string; }) {
  throw new Error("Function not implemented.");
}

