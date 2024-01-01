import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login";
import { CityList } from "./components/cITYlIST.JSX";
import { CountryList } from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CititesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import Homepage from "./pages/HomePage.jsx";

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
