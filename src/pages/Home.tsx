import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import MainButton from "@/components/buttons/MainButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const HomePage = () => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		const alreadyPlayed = sessionStorage.getItem("home_animation_played");

		if (!alreadyPlayed) {
			setAnimate(true);
			sessionStorage.setItem("home_animation_played", "true");
		}
	}, []);

	return (
		<div className={styles.container}>
			<img
				src="/logo_for_white.png"
				alt="Panna wedding salon"
				className={`${styles.logo} ${!animate ? styles.logoStatic : ""}`}
			/>

			<div
				className={`${styles.buttons} ${!animate ? styles.buttonsStatic : ""}`}
			>
				<MainButton to="/search">Знайти</MainButton>
				<SecondaryButton to="/orders/new">
					Створити замовлення
				</SecondaryButton>
			</div>
		</div>
	);
};

export default HomePage;
