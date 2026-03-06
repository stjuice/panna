import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useOrder } from "@/behavior/orders/useOrder";
import { orderToForm } from "@/behavior/orders/orderFormState";
import type { OrderForm } from "@/behavior/orders/types";
import { updateOrder } from "@/api/orders.api";
import styles from "@/styles/orders.module.scss";
import OrderDetailsHeader from "@/components/orders/order-details/OrderDetailsHeader";
import CustomerSection from "@/components/orders/order-details/CustomerSection";
import TypeSelector from "@/components/orders/order-details/TypeSelector";
import DescriptionSection from "@/components/orders/order-details/DescriptionSection";
import FittingDate from "@/components/orders/order-details/FittingDate";
import PaymentSection from "@/components/orders/order-details/PaymentSection";
import OrderDetailsActions from "@/components/orders/order-details/OrderDetailsActions";
import BackButton from "@/components/buttons/BackButton";

const OrderDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const orderId = id ?? "";
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: order, isLoading, error } = useOrder(orderId);

	const [form, setForm] = useState<OrderForm | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (order) {
			setForm(orderToForm(order));
		}
	}, [order]);

	if (!orderId) {
		return (
			<div className={styles.container}>
				<p>Invalid order ID.</p>
				<BackButton to="/search" text="Back to orders" />
			</div>
		);
	}
	if (isLoading) {
		return <div className={styles.container}>Завантаження…</div>;
	}
	if (error || !order) {
		return (
			<div className={styles.container}>
				<p>Замовлення не знайдено.</p>
				<BackButton to="/search" text="Назад до пошуку" />
			</div>
		);
	}
	if (!form) {
		return <div className={styles.container}>Завантаження…</div>;
	}

	const setFormUpdates = (updates: Partial<OrderForm>) => {
		setForm((prev) => (prev ? { ...prev, ...updates } : prev));
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await updateOrder(orderId, {
				customer_name: form.customer_name,
				customer_phone: form.customer_phone,
				school_name: form.school_name || undefined,
				school_city: form.school_city || undefined,
				type: form.type,
				status: form.status,
				description: form.description || undefined,
				release_date: form.release_date || null,
				next_visit_date: form.next_visit_date || null,
				price: form.price === "" ? null : form.price,
				deposit: form.deposit === "" ? null : form.deposit,
			});
			queryClient.invalidateQueries({ queryKey: ["order", orderId] });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			navigate("/search");
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancelOrder = () => {
		setFormUpdates({ status: "cancelled" });
		// Optionally call API and then navigate
	};

	return (
		<div className={styles.container}>
			<OrderDetailsHeader
				orderNumber={order.order_number}
				status={form.status}
				onStatusChange={(status) =>
					setFormUpdates({ status: status as OrderForm["status"] })
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

			<TypeSelector
				value={form.type}
				onChange={(type) =>
					setFormUpdates({ type: type as OrderForm["type"] })
				}
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
