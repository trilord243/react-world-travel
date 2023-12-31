import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { CityList } from "./components/cITYlIST.JSX";
import { CountryList } from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CititesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";



export default function App() {


  return (
    <AuthProvider>



      <CititesProvider>



        <BrowserRouter>

          <Routes>
            <Route index element={<HomePage />} />
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
