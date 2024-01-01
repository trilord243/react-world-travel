import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Product from "../starter/pages/Product";
import Pricing from "./pages/Pricing";
import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import { CityList } from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";






export default function App() {


  return (
    <AuthProvider>



      <CititesProvider>



        <BrowserRouter>

          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
              <Route index element={<Navigate replace to='cities' />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />



          </Routes>



        </BrowserRouter>
      </CititesProvider>
    </AuthProvider>
  )
}
