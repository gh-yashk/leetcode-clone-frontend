import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/problemset/" />} />
                <Route path="/problems" element={<Navigate to="/problemset/" />} />
                <Route path="/problemset/" element={<Home />} />
                <Route path="/problems/slug" element={<ProblemDetail />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </>
    )
}