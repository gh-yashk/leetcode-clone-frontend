import ProfileAndLogin from "@/components/ProfileAndLogin"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, CloudUpload, List, Play } from "lucide-react"
import lcLogo from "../assets/lc_logo.svg"

export default function ProblemDetail() {
    return (
        <>
            <div className="bg-[#0f0f0f] w-screen h-screen">

                {/* navigation bar */}
                <nav className="px-4 pl-6 h-12 flex items-center justify-between">

                    <div className="min-w-60 flex items-center gap-2">
                        <a href="/">
                            <img src={lcLogo} alt="LeetCode Logo" className="h-5 w-5" />
                        </a>
                        <div className="h-4"><Separator orientation="vertical" className="bg-[#2f2f2f]" /></div>
                        <div className="flex items-center hover:bg-[#1f2020] rounded-sm">
                            <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 flex items-center gap-1 px-2 rounded-l-sm">
                                <List className="h-5" color="#b7b7b7" />
                                <span>Problem List</span>
                            </button>
                            <div className="h-6"><Separator orientation="vertical" className="bg-[#0f0f0f]" /></div>
                            <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 w-8 flex justify-center">
                                <ChevronLeft className="h-5" color="#b7b7b7" />
                            </button>
                            <div className="h-6"><Separator orientation="vertical" className="bg-[#0f0f0f]" /></div>
                            <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 w-8 flex justify-center rounded-r-sm">
                                <ChevronRight className="h-5" color="#b7b7b7" />
                            </button>
                        </div>
                    </div>

                    <div className="min-w-60 flex justify-center">
                        <div className="flex justify-center items-center bg-[#1f2020] rounded-sm">
                            <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 w-8 flex justify-center rounded-l-sm">
                                <Play className="h-5" color="#b7b7b7" fill="#b7b7b7" />
                            </button>
                            <div className="h-8"><Separator orientation="vertical" className="bg-[#0f0f0f]" /></div>
                            <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 px-2 flex justify-center rounded-r-sm gap-1">
                                <CloudUpload className="h-5" color="#28c244" />
                                <span className="text-[#28c244]">Submit</span>
                            </button>
                        </div>
                    </div>

                    <div className="min-w-60 flex justify-end">
                        <ProfileAndLogin />
                    </div>

                </nav>

            </div>
        </>
    )
}