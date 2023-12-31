import styles from "./Message.module.css";

function Message({ children: message }) {

  return (
    <p className={styles.message}>
      <span role="img">👋{message} </span>
    </p>
  );
}

export default Message;
