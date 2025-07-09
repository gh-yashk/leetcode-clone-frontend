import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProblemDetail from "./pages/ProblemDetail";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/problemset/" />} />
                <Route path="/problems" element={<Navigate to="/problemset/" />} />
                <Route path="/problemset/" element={<Home />} />
                <Route path="/problems/:slug" element={<ProblemDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-center" duration={3000} />
        </>
    )
}