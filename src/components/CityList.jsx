import { CityItem } from './CityItem'
import styles from './cityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
export const CityList = ({ cities, isLoading }) => {
    console.log(cities)

    if (isLoading) return (<Spinner />)

    if (cities.length === 0) return (<Message message='Add yout first city click on the map' />)


    return (
        <ul className={styles.cityList} >

            {cities.map(city => <CityItem key={city.id} city={city} />)}

        </ul>
    )
}




