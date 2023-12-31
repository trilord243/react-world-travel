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

    async function createCity(newCity) {
        try {
            setIsLoading(true)
            const response = await fetch(API, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()

            setCities(prevCities => [...prevCities, data])

        } catch (error) {
            alert("error")
            console.log(error)

        } finally {
            setIsLoading(false)
        }
    }

    async function deletecity(id) {
        try {
            setIsLoading(true)
            await fetch(API + "/" + id, {
                method: "DELETE",


            })
            const filterCities = cities.filter(city => city.id !== id)
            setCities(filterCities)




        } catch (error) {
            alert("error")
            console.log(error)

        } finally {
            setIsLoading(false)
        }
    }




    return (
        <CitiesContext.Provider value={{ cities, isLoading, API, currentCity, setCurrentCity, createCity, deletecity }}>
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