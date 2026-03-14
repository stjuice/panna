import styles from "styles/orderDetails.module.scss";
import type { OrderForm } from "behavior/orders";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useOrders, useOrderActions, orderToForm, getDefaultOrderForm } from "behavior/orders";
import OrderDetailsHeader from "components/orders/order-details/OrderDetailsHeader";
import { CustomerSection } from "components/customer";
import TypeSelector from "components/orders/order-details/TypeSelector";
import DescriptionSection from "components/orders/order-details/DescriptionSection";
import FittingDate from "components/orders/order-details/FittingDate";
import PaymentSection from "components/orders/order-details/PaymentSection";
import OrderDetailsActions from "components/orders/order-details/OrderDetailsActions";
import { BackButton } from "components/buttons";

type Mode = "create" | "edit";

const OrderDetailsPage = () => {
	const { id } = useParams<{ id?: string }>();
	const mode: Mode = !id || id === "new" ? "create" : "edit";
	const isCreateMode = mode === "create";

	const orderId = id ?? "";
	const navigate = useNavigate();
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);
	const returnSearchUrl =
		"/search" +
		(searchParams.toString() ? `?${searchParams.toString()}` : "");
	const { data: order, isLoading } = useOrders(orderId);
	const { create, update, cancel, isSaving } = useOrderActions(orderId);

	const emptyOrder = getDefaultOrderForm();
	const [form, setForm] = useState<OrderForm>(emptyOrder);

	useEffect(() => {
		if (order) {
			setForm(orderToForm(order));
		}
	}, [order]);

	const setFormUpdates = (updates: Partial<OrderForm>) => {
		setForm((prev) => ({ ...prev, ...updates }));
	};

	const handleSave = async () => {
		if (isCreateMode) {
			const created = await create(form);
			navigate(`/orders/${created.id}`);
		} else {
			if (!order) return;
			await update(form, order);
			navigate(returnSearchUrl);
		}
	};

	const handleCancelOrder = async () => {
		await cancel();
		navigate(returnSearchUrl);
	};

	const pageTitle = isCreateMode
		? "Нове замовлення"
		: `Замовлення №${order?.order_number ?? ""}`;

	if (!isCreateMode && isLoading) {
		return <div className={styles.container}>Завантаження…</div>;
	}
	if (!isCreateMode && (order === undefined || order === null)) {
		return (
			<div className={styles.container}>
				<p>Замовлення не знайдено.</p>
				<BackButton to={returnSearchUrl} text="Назад до пошуку" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<OrderDetailsHeader
				title={pageTitle}
				status={form.status}
				onStatusChange={(status) => setFormUpdates({ status })}
				backTo={returnSearchUrl}
			/>

      <TypeSelector
        value={form.type}
        onChange={(type) =>
          setFormUpdates({ type: type as OrderForm["type"] })
        }
      />

			<CustomerSection
				orderType={form.type}
				form={{
					customer_name: form.customer_name,
					customer_phone: form.customer_phone,
					school_city: form.school_city,
					school_name: form.school_name,
					release_date: form.release_date,
				}}
				onChange={(updates) => setFormUpdates(updates)}
			/>

			<DescriptionSection
				value={form.description}
				onChange={(description) => setFormUpdates({ description })}
			/>

			<FittingDate
				value={form.next_visit_date}
				onChange={(next_visit_date) => setFormUpdates({ next_visit_date })}
			/>

			<PaymentSection
				price={form.price ?? ""}
				deposit={form.deposit ?? ""}
				onChange={(updates) => setFormUpdates(updates)}
			/>

			<OrderDetailsActions
				onSave={handleSave}
				onOrderDelete={handleCancelOrder}
				isSaving={isSaving}
				isCreateMode={isCreateMode}
				backToSearch={returnSearchUrl}
			/>
		</div>
	);
};

export default OrderDetailsPage;
