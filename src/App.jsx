// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import About from "./components/About";
// import Dashboard from "./components/AdminDashboard";
// import { AuthProvider } from "./components/AuthContext";
// import Contact from "./components/Contact";
// import ErrorPage from "./components/ErrorPage";
// import FullPage from "./components/FullPage";
// import HeaderLayout from "./components/header/HeaderLayout";
// import Login from "./components/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import SignUp from "./components/SignUp";
// import UserDashboard from "./components/UserDashboard";
// import Gallery from "./components/Gallery";
// import Home from "./components/Home";

// const App = () => {
//     return (
//         <AuthProvider>
//             <BrowserRouter>
//                 <Routes>
//                     {/* Routes that show Header */}
//                     <Route element={<HeaderLayout />}>
//                         <Route path="/" element={<Home />} />
//                         <Route
//                             path="/registration-form"
//                             element={<FullPage />}
//                         />
//                         <Route
//                             path="/userdashboard"
//                             element={<UserDashboard />}
//                         />
//                         <Route path="/about" element={<About />} />
//                         <Route path="/contact" element={<Contact />} />
//                         <Route path="/gallery" element={<Gallery />} />

//                         <Route
//                             path="/dashboard"
//                             element={
//                                 <ProtectedRoute>
//                                     <Dashboard />
//                                 </ProtectedRoute>
//                             }
//                         />

//                         {/* login signup */}
//                         <Route path="/signup" element={<SignUp />} />
//                         <Route path="/login" element={<Login />} />

//                         {/* Fallback */}
//                         <Route path="*" element={<ErrorPage />} />
//                     </Route>

//                     {/* Routes that do not show Header */}
                    
//                     {/* <Route path="/signup" element={<SignUp />} />
//                     <Route path="/login" element={<Login />} /> */}
//                 </Routes>
//             </BrowserRouter>
//         </AuthProvider>
//     );
// };

// export default App;



import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/AdminDashboard";
import { AuthProvider } from "./components/AuthContext";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
import FullPage from "./components/FullPage";
import HeaderLayout from "./components/header/HeaderLayout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/UserDashboard";
import Gallery from "./components/Gallery";
import Home from "./components/Home";

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
