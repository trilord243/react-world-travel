import { CityItem } from './CityItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'
export default function CountryList() {
    const { cities, isLoading } = useCities()

    if (isLoading) return (<Spinner />)

    if (cities.length === 0) return (<Message message='Add yout first city click on the map' />)

    const country = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);
    return (
        <ul className={styles.countryList} >

            {country.map(country => <CountryItem key={country.country} country={country} />)}

        </ul>
    )
}




