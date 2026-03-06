import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useOrder } from "@/behavior/orders/useOrder";
import { orderToForm, getDefaultOrderForm } from "@/behavior/orders/orderFormState";
import type { OrderForm } from "@/behavior/orders/types";
import { createCustomer } from "@/api/customers.api";
import { createOrder, updateOrder } from "@/api/orders.api";
import styles from "@/styles/orders.module.scss";
import OrderDetailsHeader from "@/components/orders/order-details/OrderDetailsHeader";
import CustomerSection from "@/components/orders/order-details/CustomerSection";
import TypeSelector from "@/components/orders/order-details/TypeSelector";
import DescriptionSection from "@/components/orders/order-details/DescriptionSection";
import FittingDate from "@/components/orders/order-details/FittingDate";
import PaymentSection from "@/components/orders/order-details/PaymentSection";
import OrderDetailsActions from "@/components/orders/order-details/OrderDetailsActions";
import BackButton from "@/components/buttons/BackButton";

type Mode = "create" | "edit";

const OrderDetailsPage = () => {
	const { id } = useParams<{ id?: string }>();
	const mode: Mode = !id || id === "new" ? "create" : "edit";
	const isCreateMode = mode === "create";

	const orderId = id ?? "";
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: order, isLoading } = useOrder(orderId, {
		enabled: !isCreateMode,
	});

	const emptyOrder = getDefaultOrderForm();
	const [form, setForm] = useState<OrderForm>(emptyOrder);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (order) {
			setForm(orderToForm(order));
		}
	}, [order]);

	const setFormUpdates = (updates: Partial<OrderForm>) => {
		setForm((prev) => ({ ...prev, ...updates }));
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			if (isCreateMode) {
				const customer = await createCustomer({
					full_name: form.customer_name,
					phone: form.customer_phone,
				});
				const created = await createOrder({
					customer_id: customer.id,
					type: form.type,
					status: form.status,
					description: form.description || null,
					release_date: form.release_date || null,
					next_visit_date: form.next_visit_date || null,
					price: form.price === "" ? null : form.price,
					deposit: form.deposit === "" ? null : form.deposit,
				});
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				navigate(`/orders/${created.id}`);
			} else {
				await updateOrder(orderId, {
					type: form.type,
					status: form.status,
					description: form.description || null,
					release_date: form.release_date || null,
					next_visit_date: form.next_visit_date || null,
					price: form.price === "" ? null : form.price,
					deposit: form.deposit === "" ? null : form.deposit,
				});
				queryClient.invalidateQueries({ queryKey: ["order", orderId] });
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				navigate("/search");
			}
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancelOrder = () => {
		setFormUpdates({ status: "cancelled" });
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
				<BackButton to="/search" text="Назад до пошуку" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<OrderDetailsHeader
				title={pageTitle}
				status={form.status}
				onStatusChange={(status) =>
					setFormUpdates({ status: status as OrderForm["status"] })
				}
			/>

      <TypeSelector
        value={form.type}
        onChange={(type) =>
          setFormUpdates({ type: type as OrderForm["type"] })
        }
      />

			<CustomerSection
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
				price={form.price}
				deposit={form.deposit}
				onChange={(updates) => setFormUpdates(updates)}
			/>

			<OrderDetailsActions
				onSave={handleSave}
				onCancelOrder={handleCancelOrder}
				isSaving={isSaving}
			/>
		</div>
	);
};

export default OrderDetailsPage;
