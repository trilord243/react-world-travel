import { createContext, useContext, useEffect, useState } from "react";

//Creat contexto 
const CitiesContext = createContext()


const API = "http://localhost:8001/cities"
//Componente provider con su children 
const CititesProvider = ({ children }) => {

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true)
                const response = await fetch(API)
                const data = await response.json()

                setCities(data)

            } catch (error) {
                alert("error")
                console.log(error)

            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()

    }, [])


    return (
        <CitiesContext.Provider value={{ cities, isLoading, API, currentCity, setCurrentCity }}>
            {children}
        </CitiesContext.Provider>
    )


}


function useCities() {
    const context = useContext(CitiesContext)
    if (!context) {
        throw new Error('useCities debe estar dentro del proveedor CitiesContext')
    }
    return context
}

export { useCities, CititesProvider }