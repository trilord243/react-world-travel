
import { Link, useNavigate } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';





const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",

    }).format(new Date(date));





export const CityItem = ({ city }) => {
    const { deleteCity } = useCities()
    const handleClick = (e) => {
        e.preventDefault()
        deleteCity(id)
    }
    const navigate = useNavigate()
    const { cityName, emoji, date, id, position } = city
    const { currentCity } = useCities()

    const isCurrentCity = currentCity.id === id

    return (
        <li   >
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem}  ${isCurrentCity ? styles['cityItem--active'] : ''}   `}>


                <span className={styles.emoji}  >{emoji}</span>
                <h3 className={styles.name} >{cityName}</h3>
                <time className={styles.date} > ({formatDate(date)}) </time>
                <button onClick={handleClick} className={styles.deleteBtn} >&times; </button>
            </Link>
        </li>
    )
}
