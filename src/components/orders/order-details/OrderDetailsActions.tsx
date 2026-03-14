import { useNavigate } from "react-router-dom";
import { ActionLink, MainButton, SecondaryButton } from "components/buttons";
import styles from "styles/orderDetails.module.scss";

type OrderDetailsActionsProps = {
	onSave: () => void;
	onOrderDelete: () => void;
	isSaving?: boolean;
	isCreateMode?: boolean;
	backToSearch?: string;
};

const OrderDetailsActions = ({
	onSave,
	onOrderDelete,
	isSaving = false,
	isCreateMode = false,
	backToSearch = "/search",
}: OrderDetailsActionsProps) => {
	const navigate = useNavigate();

	return (
		<section className={styles.actionsSection}>
			<div className={styles.actions}>
				<SecondaryButton onClick={() => navigate(backToSearch)} size="medium">
					Відмінити
				</SecondaryButton>
				<MainButton onClick={onSave} disabled={isSaving} size="medium">
					{isSaving ? "Збереження…" : "Зберегти"}
				</MainButton>
			</div>
			{!isCreateMode && (
				<div>
					<ActionLink className={styles.deleteButton} onClick={onOrderDelete}>
						Видалити замовлення
					</ActionLink>
				</div>
			)}
		</section>
	);
};

export default OrderDetailsActions;

