import { HashRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/AdminDashboard";
import { AuthProvider } from "./components/AuthContext";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
import FullPage from "./components/FullPage";
import Gallery from "./components/Gallery";
import HeaderLayout from "./components/header/HeaderLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/UserDashboard";
import Withdraw from "./components/Withdraw";

const App = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    {/* Routes that show Header */}
                    <Route element={<HeaderLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/registration-form"
                            element={<FullPage />}
                        />
                        <Route
                            path="/userdashboard"
                            element={<UserDashboard />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/withdraw" element={<Withdraw />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* login signup */}
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />

                        {/* Fallback */}
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
