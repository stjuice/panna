import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "api/customers.api";

export const useCustomers = () => {
	return useQuery({
		queryKey: ["customers"],
		queryFn: fetchCustomers,
	});
};
