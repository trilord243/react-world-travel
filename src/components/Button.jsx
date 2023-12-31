import styles from './Button.module.css'

export default function Button({ children, onclick, type }) {
    return (
        <button onclick={onclick} className={styles.btn} > {children}  </button>
    )
}
