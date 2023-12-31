import React from 'react'
import styles from './AppNav.module.css'
import { NavLink } from 'react-router-dom'
function AppNav() {
    return (
        <div className={styles.nav} >
            <ul>
                <li> <NavLink to="cities" >CITIES</NavLink> </li>
                <li> <NavLink to="countries" > COUNTRY</NavLink> </li>
            </ul>


        </div>
    )
}

export default AppNav