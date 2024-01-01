import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

//Creat contexto 
const CitiesContext = createContext()



//Componente provider con su children 
const BASE_URL = "https://city-server.vercel.app";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "city/loaded":
            return { ...state, isLoading: false, currentCity: [...state.cities, action.payload] };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            };

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            throw new Error("Unknown action type");
    }
}
const CititesProvider = ({ children }) => {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );



    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading cities...",
                });
            }
        }
        fetchCities();
    }, []);



    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;

            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json();
                dispatch({ type: "city/loaded", payload: data });
            } catch {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading the city...",
                });
            }
        },
        [currentCity.id]
    );






    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });


            dispatch({ type: "city/created", payload: newCity });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error creating the city...",
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });

            dispatch({ type: "city/deleted", payload: id });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting the city...",
            });
        }
    }





    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, createCity, deleteCity, getCity }}>
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