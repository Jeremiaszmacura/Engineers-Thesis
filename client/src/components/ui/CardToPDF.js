import styles from './CardToPDF.module.css';

const CardToPDF = (props) => {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    );
}

export default CardToPDF;
