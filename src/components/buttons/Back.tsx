import styles from "./buttons.module.scss";
import Button from "./Button";

type BackButtonProps = {
	to?: string;
	size?: "default" | "medium" | "small";
	onClick?: () => void;
	text: string;
};

const Back = ({ to, size = "small", onClick, text }: BackButtonProps) => {
	return (
		<div className={styles.backContainer}>
      <span className={styles.arrow}>←</span>
      <Button to={to} size={size} onClick={onClick} className={styles.back}>
        {text}
      </Button>
		</div>
	);
};

export default Back;
