import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import CheckoutChoice from "./pages/CheckoutChoice";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminMenu from "./pages/admin/AdminMenu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminTables from "./pages/admin/AdminTables";
import TableMenu from "./pages/TableMenu";

function App() {

    return (
        <BrowserRouter>

            <Header />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/menu"
                    element={<Menu />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />
                <Route
                    path="/checkout"
                    element={<CheckoutChoice />}
                />
                <Route path="/checkout/details" element={<Checkout />} />
                <Route
                    path="/about"
                    element={
                        <About/>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <Contact />
                    }
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />
                <Route path="/table/:tableCode" element={<TableMenu />} />

               <Route element={<AdminProtectedRoute />}>

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/orders"
                        element={<AdminOrders />}
                    />


                    <Route
                        path="/admin/menu"
                        element={<AdminMenu />}
                    />
                    <Route path="/admin/tables" element={<AdminTables />} />
               </Route>

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;