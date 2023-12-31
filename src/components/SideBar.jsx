import Logo from "./Logo";
import styles from "./SideBar.module.css";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
export const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <footer className={styles.footer} >

                <p className={styles.copyright} >   &copy; Copyright {new Date().getFullYear()}  by Trilords inc. </p>
            </footer>

        </div>
    )
}
