import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import FullPage from "./components/FullPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <>
            <AuthProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<FullPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </HashRouter>
            </AuthProvider>
        </>
    );
};
export default App;
