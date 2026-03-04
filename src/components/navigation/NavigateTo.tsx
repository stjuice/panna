import { Link } from "react-router-dom";
import styles from "./navigation.module.scss";

const NavigateTo = ({ to, children }: { to: string; children: React.ReactNode }) => {
	return (
		<Link to={to} className={styles.button}>
			{children}
		</Link>
	);
};

export default NavigateTo;
