import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { getOrdersRepository } from "@/lib/orders/factory";
import type { NewOrder } from "@/types/orders";
import styles from "@/styles/orders.module.scss";

const repo = getOrdersRepository();

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<NewOrder>({
    CreatedDate: new Date().toISOString().slice(0, 10),
    CustomerName: "",
    CustomerPhoneNumber: "",
    Details: "",
  });

  const mutation = useMutation({
    mutationFn: (payload: NewOrder) => repo.createOrder(payload),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate(`/order/${order.ID}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create order</h1>
        <Link to="/">Back to list</Link>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "400px" }}>
        <label>
          Date
          <input
            type="date"
            value={form.CreatedDate}
            onChange={(e) => setForm((f) => ({ ...f, CreatedDate: e.target.value }))}
            required
          />
        </label>
        <label>
          Customer name
          <input
            value={form.CustomerName}
            onChange={(e) => setForm((f) => ({ ...f, CustomerName: e.target.value }))}
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={form.CustomerPhoneNumber}
            onChange={(e) => setForm((f) => ({ ...f, CustomerPhoneNumber: e.target.value }))}
          />
        </label>
        <label>
          Details
          <textarea
            value={form.Details}
            onChange={(e) => setForm((f) => ({ ...f, Details: e.target.value }))}
          />
        </label>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating…" : "Create"}
        </button>
        {mutation.isError && <p style={{ color: "red" }}>{String(mutation.error)}</p>}
      </form>
    </div>
  );
}
