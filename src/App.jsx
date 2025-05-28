import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";
import FullPage from "./components/FullPage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="./" element={<FullPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FullPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter> */}
        </>
    );
};
export default App;
