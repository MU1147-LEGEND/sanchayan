import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FullPage from "./components/FullPage";

const App = () => {
    return (
        <>
            {/* <AnnouncementBar />
            <Header />
            <MemberForm1 /> */}

            {/* private */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FullPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;
