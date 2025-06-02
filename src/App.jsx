import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/AdminDashboard";
import ErrorPage from "./components/ErrorPage";
import FullPage from "./components/FullPage";
import HeaderLayout from "./components/header/HeaderLayout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/UserDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Routes that show Header */}
                    <Route element={<HeaderLayout />}>
                        <Route path="/" element={<FullPage />} />
                        <Route path="/sanchayan" element={<FullPage />} />
                        <Route
                            path="/userdashboard"
                            element={<UserDashboard />}
                        />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Routes that do not show Header */}
                    <Route path="/login" element={<Login />} />

                    {/* Fallback */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
