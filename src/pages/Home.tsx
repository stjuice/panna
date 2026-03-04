import { Link } from "react-router-dom";
import styles from "@/styles/orders.module.scss";

const HomePage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Panna</h1>
			<nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<Link to="/orders" className={styles.card} style={{ display: "block" }}>
					Orders
				</Link>
				<Link to="/search" className={styles.card} style={{ display: "block" }}>
					Search
				</Link>
			</nav>
		</div>
	);
};

export default HomePage;
