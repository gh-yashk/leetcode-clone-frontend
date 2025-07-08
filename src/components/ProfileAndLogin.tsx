import { getLoginUrl } from "@/lib/api/users";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Trash2, UserRound } from "lucide-react";
import { useEffect } from "react";
import githubLogo from "../assets/github_logo.svg";
import leetCode2Logo from "../assets/leetcode2.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function ProfileAndLogin() {

    const { user, fetchUser, logout } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            <div>
                {
                    user ?
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div>
                                        <Avatar className="h-8 w-8 cursor-pointer">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="rounded-lg"><UserRound color="#c9c9c9" /></AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="bg-[#1e1e1e] border-2 border-[#424242] text-[#f5f5f5] w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side="left"
                                    align="start"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="rounded-lg"><UserRound color="#c9c9c9" /></AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">{user.username}</span>
                                                <span className="truncate text-xs">{user.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#424242]" />
                                    <DropdownMenuItem className="hover:!bg-[#2f2f2f] !text-[#f5f5f5] cursor-pointer">
                                        <Trash2 />
                                        Delete Account
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-[#424242]" />
                                    <DropdownMenuItem
                                        className="hover:!bg-[#2f2f2f] !text-[#f5f5f5] cursor-pointer"
                                        onClick={logout}
                                    >
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                        :
                        <>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-[#ffa116] bg-[#ffa1161f] hover:bg-[#3f2c10] py-1.5 px-4 rounded-sm cursor-pointer">
                                        Login
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-[#0f0f0f] border-2 border-[#424242]">
                                    <img
                                        className="mx-auto h-32 w-32 mt-4"
                                        src={leetCode2Logo} alt="LeetCode Logo"
                                    />
                                    <a
                                        href={getLoginUrl()}
                                        className="bg-[#151515] py-2 mb-4 rounded-sm flex items-center justify-center gap-2 hover:bg-[#1c1c1c] border border-[#424242] cursor-pointer"
                                    >
                                        <img src={githubLogo} alt="Github Logo" className="h-5 w-5" />
                                        <span>Login with GitHub</span>
                                    </a>
                                </DialogContent>
                            </Dialog>
                        </>
                }
            </div>
        </>
    )
}
