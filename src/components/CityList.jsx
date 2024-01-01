import { CityItem } from './CityItem'
import styles from './cityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
import { useEffect } from 'react'
export const CityList = () => {
    const { cities, isLoading } = useCities()

    if (isLoading) return (<Spinner />)

    if (cities.length === 0) return (<Message message='Add yout first city click on the map' />)

    console.log(cities)


    return (
        <ul className={styles.cityList} >

            {cities.map(city => <CityItem key={city.id} city={city} />)}

        </ul>
    )
}




