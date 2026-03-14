import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useOrder } from "behavior/orders/useOrder";
import { orderToForm, getDefaultOrderForm } from "behavior/orders/orderFormState";
import type { OrderForm, OrderStatus } from "behavior/orders/types";
import { createCustomer } from "api/customers.api";
import { findOrCreateSchool } from "api/schools.api";
import { cancelOrder, createOrder, saveOrder } from "api/orders.api";
import styles from "styles/orderDetails.module.scss";
import OrderDetailsHeader from "components/orders/order-details/OrderDetailsHeader";
import CustomerSection from "components/orders/order-details/CustomerSection";
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
	const queryClient = useQueryClient();

	const searchParams = new URLSearchParams(location.search);
	const returnSearchUrl =
		"/search" +
		(searchParams.toString() ? `?${searchParams.toString()}` : "");
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
				const school =
					form.type === "graduation" && form.school_name?.trim()
						? await findOrCreateSchool(
								form.school_name.trim(),
								form.school_city?.trim() || undefined,
							)
						: null;
				const created = await createOrder({
					customer_id: customer.id,
					school_id: school?.id ?? null,
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
				if (!order) return;

				const payload = {
					p_order_id: order.order_id,
					p_customer_id: order.customer_id ?? null,
					p_customer_name: form.customer_name.trim(),
					p_customer_phone: form.customer_phone.trim(),
					p_school_name: form.school_name?.trim() || "",
					p_school_city: form.school_city?.trim() || "",
					p_type: form.type,
					p_status: form.status,
					p_description: form.description?.trim() || null,
					p_release_date: form.release_date || null,
					p_next_visit_date: form.next_visit_date || null,
					p_price: form.price === "" ? null : form.price,
					p_deposit: form.deposit === "" ? null : form.deposit,
				};
				await saveOrder(payload);

				queryClient.invalidateQueries({ queryKey: ["order", orderId] });
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				navigate(returnSearchUrl);
			}
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancelOrder = async () => {
		await cancelOrder(orderId);
		queryClient.invalidateQueries({ queryKey: ["order", orderId] });
		queryClient.invalidateQueries({ queryKey: ["orders"] });
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
				onCancelOrder={handleCancelOrder}
				isSaving={isSaving}
				isCreateMode={isCreateMode}
				backToSearch={returnSearchUrl}
			/>
		</div>
	);
};

export default OrderDetailsPage;
