import ProfileAndLogin from "@/components/ProfileAndLogin";
import { House } from "lucide-react";
import notFoundPng from "../assets/404_face.png";
import leetcodeLogo from "../assets/leetcode.svg";

export default function NotFound() {
    return (
        <>
            <div className="max-w-3xl mx-auto">

                {/* navigation bar */}
                <nav className="flex items-center justify-between my-6 px-12">
                    <a href="/">
                        <img className="h-7" src={leetcodeLogo} alt="LeetCode Logo" />
                    </a>
                    <ProfileAndLogin />
                </nav>

                {/* separator */}
                <div className="bg-[#333] h-[1px]" />

                {/* 404 not found */}
                <div className="flex items-center justify-center mt-36">
                    <img src={notFoundPng} alt="404 Not Found" className="h-52" />
                    <div className="flex flex-col ml-6">
                        <div className="text-xl text-[#babcbf] font-[700]">Page Not Found</div>
                        <div className="font-[400] text-[#999b9e] my-2">Sorry, but we can't find the page you are looking for...</div>
                        <a href="/" className="flex items-center border-2 border-[#333] w-fit px-2 py-1 rounded-sm my-2 gap-1 hover:bg-[#2f2f2f]">
                            <House className="h-5" color="#babcbf" />
                            <div className="text-[#babcbf]">Back to Home</div>
                        </a>
                    </div>
                </div>

            </div>
        </>
    )
}