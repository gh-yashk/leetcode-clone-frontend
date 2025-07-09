import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center">
                <LoaderCircle className="animate-spin" color="#959595" size={64} />
            </div>
        </>
    )
}