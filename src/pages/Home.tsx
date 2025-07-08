import ProfileAndLogin from "@/components/ProfileAndLogin";
import leetcodeLogo from "../assets/leetcode.svg";

export default function Home() {
    return (
        <>
            <div className=" mx-auto">

                {/* navigation bar */}
                <nav className="flex items-center justify-between my-6 px-12">
                    <a href="/">
                        <img className="h-7" src={leetcodeLogo} alt="LeetCode Logo" />
                    </a>
                    <ProfileAndLogin />
                </nav>
                <div className="bg-[#333] h-[1px]" />

            </div>
        </>
    )
}