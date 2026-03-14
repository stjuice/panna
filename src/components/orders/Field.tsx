import styles from "styles/search.module.scss";

type FieldProps = {
  label: string;
  value: string;
  classNameField?: string;
  classNameLabel?: string;
};

export const Field = ({ label, value, classNameField = styles.field, classNameLabel = styles.label }: FieldProps) => (
  <div className={classNameField}>
    <span className={classNameLabel}>{label}</span>
    <span>{value}</span>
  </div>
);