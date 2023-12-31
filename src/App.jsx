import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { CityList } from "./components/cITYlIST.JSX";
import { useEffect, useState } from "react";
import { CountryList } from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const API = "http://localhost:8001/cities"

export default function App() {
  const [cities, setCities] = useState({})
  const [isLoading, setIsLoading] = useState(true)


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
    <BrowserRouter>

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />



      </Routes>



    </BrowserRouter>
  )
}
