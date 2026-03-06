import styles from "./home.module.scss";
import MainButton from "@/components/buttons/MainButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const HomePage = () => {
	return (
		<div className={styles.container}>
			<img src="/logo_for_white.png" alt="Panna wedding salon" className={styles.logo} />
			<div className={styles.buttons}>
				<MainButton to="/search">Знайти</MainButton>
				<SecondaryButton to="/orders/new">Створити замовлення</SecondaryButton>
			</div>
		</div>
	);
};

export default HomePage;
