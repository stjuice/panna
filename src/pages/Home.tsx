import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import MainButton from "@/components/buttons/MainButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const HomePage = () => {
	const [playIntro] = useState(() => {
		if (typeof window === "undefined") return false;

		const played = sessionStorage.getItem("home_intro");
			if (!played) {
			sessionStorage.setItem("home_intro", "1");
			return true;
		}

		return false;
	});


	return (
		<div className={styles.container}>
			<img
				src={`${import.meta.env.BASE_URL}logo_for_white.png`}
				alt="Panna wedding salon"
				className={`${styles.logo} ${playIntro ? styles.logoIntro : styles.logoReady}`}
			/>

			<div
				className={`${styles.buttons} ${playIntro ? styles.buttonsIntro : styles.buttonsReady}`}
			>
				<MainButton to="/search">Знайти</MainButton>
				<SecondaryButton to="/orders/new">Створити замовлення</SecondaryButton>
			</div>
		</div>
	);
};

export default HomePage;
