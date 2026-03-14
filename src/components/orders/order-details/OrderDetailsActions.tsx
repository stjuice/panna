import { useState } from "react";
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
	const [showConfirm, setShowConfirm] = useState(false);

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
					<ActionLink className={styles.deleteButton} onClick={() => setShowConfirm(true)}>
						Видалити замовлення
					</ActionLink>
				</div>
			)}

			{showConfirm && (
				<div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
					<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<p className={styles.modalText}>
							Ви дійсно хочете видалити це замовлення? Цю дію неможливо скасувати.
						</p>
						<div className={styles.modalActions}>
							<MainButton size="medium" onClick={() => setShowConfirm(false)}>
								Ні, залишити
							</MainButton>
							<SecondaryButton size="medium" onClick={() => { setShowConfirm(false); onOrderDelete(); }}>
								Так, видалити
							</SecondaryButton>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default OrderDetailsActions;

