import Loading from "@/components/Loading";
import ProfileAndLogin from "@/components/ProfileAndLogin";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { fetchProblemParsed, type ParsedProblemDetail } from "@/lib/api/problems";
import { useCodeStore } from "@/store/useCodeStore";
import Editor from "@monaco-editor/react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheckBig, CloudUpload, CodeXml, FileText, List, Play, SquareCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import lcLogo from "../assets/lc_logo.svg";
import NotFound from "./NotFound";

const formatLanguage = (language: string): string =>
    language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();

export default function ProblemDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<ParsedProblemDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [userCode, setUserCode] = useState("");

    const {
        setUserCode: setCodeInStore,
        getUserCode,
        preferredLanguageId,
        setPreferredLanguage,
    } = useCodeStore();

    useEffect(() => {
        if (slug) {
            fetchProblemParsed(slug)
                .then((problem) => {
                    setProblem(problem);

                    const preferred = problem.languages.find(
                        (l) => l.id.toString() === preferredLanguageId
                    );
                    const defaultLang = preferred ?? problem.languages[0];

                    setSelectedLanguageId(defaultLang.id);
                    setSelectedLanguage(defaultLang.name);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [slug]);

    const starterCodeMap = useMemo(() => {
        return problem?.starterCode || {};
    }, [problem?.starterCode]);

    useEffect(() => {
        if (problem && selectedLanguageId != null) {
            const pid = problem.id;
            const langKey = selectedLanguageId.toString();
            const code = getUserCode(pid, langKey);
            const starter = starterCodeMap[langKey];
            setUserCode(code ?? starter ?? "");
        }
    }, [problem, selectedLanguageId, starterCodeMap]);

    const handleCodeChange = (code: string) => {
        setUserCode(code);
        if (problem && selectedLanguageId != null) {
            setCodeInStore(problem.id, selectedLanguageId.toString(), code);
        }
    };

    const handleLanguageSelect = (id: number, name: string) => {
        setSelectedLanguageId(id);
        setSelectedLanguage(name);
        setPreferredLanguage(id.toString(), name);
    };

    if (loading) return <Loading />;
    if (!problem) return <NotFound />;

    return (
        <div className="bg-[#0f0f0f] w-screen h-screen flex flex-col">
            <nav className="px-4 pl-6 h-12 flex items-center justify-between">
                <div className="min-w-60 flex items-center gap-2">
                    <a href="/">
                        <img src={lcLogo} alt="LeetCode Logo" className="h-5 w-5" />
                    </a>
                    <div className="h-4">
                        <Separator orientation="vertical" className="bg-[#2f2f2f]" />
                    </div>
                    <div className="flex items-center hover:bg-[#1f2020] rounded-sm">
                        <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 flex items-center gap-1 px-2 rounded-l-sm">
                            <List className="h-5" color="#b7b7b7" />
                            <span>Problem List</span>
                        </button>
                        <div className="h-6">
                            <Separator orientation="vertical" className="bg-[#0f0f0f]" />
                        </div>
                        <button className="cursor-pointer hover:bg-[#2f2f2f] py-1.5 w-8 flex justify-center">
                            <ChevronLeft className="h-5" color="#b7b7b7" />
                        </button>
                        <div className="h-6">
                            <Separator orientation="vertical" className="bg-[#0f0f0f]" />
                        </div>
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
                        <div className="h-8">
                            <Separator orientation="vertical" className="bg-[#0f0f0f]" />
                        </div>
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

            <div className="flex-1 overflow-hidden px-2 pb-2 ">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={50} minSize={30}>
                        <div className="pr-0.5 h-full flex flex-col min-h-0">
                            <div className="bg-[#1e1e1e] rounded-md h-full flex flex-col min-h-0">
                                <div className="flex bg-[#262626] h-9 items-center justify-between px-2 shrink-0 rounded-t-md">
                                    <div className="flex gap-0.5 items-center">
                                        <FileText color="#1990ff" className="h-4" />
                                        <span>Description</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span>Solved</span>
                                        <CircleCheckBig className="h-4" color="#28c244" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                                    <Markdown
                                        components={{
                                            h1: (props) => <h1 className="text-2xl" {...props} />,
                                            h2: (props) => <h2 className="text-lg mt-6" {...props} />,
                                            p: (props) => <p className="py-2 font-[400]" {...props} />,
                                            img: (props) => <img className="my-4" {...props} />,
                                            strong: (props) => <strong className="font-[500] ml-2" {...props} />,
                                        }}
                                    >
                                        {problem.description}
                                    </Markdown>
                                </div>
                                <div className="h-4"></div>
                            </div>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle className="bg-[#0f0f0f] w-[2px] hover:bg-[#1990ff] rounded-md" />

                    <ResizablePanel defaultSize={50} minSize={40}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={70} minSize={30}>
                                <div className="h-full pl-0.5 pb-0.5">
                                    <div className="bg-[#1e1e1e] h-full rounded-md">
                                        <div className="flex bg-[#262626] rounded-t-md h-9 items-center px-2 gap-0.5">
                                            <CodeXml color="#28c244" className="h-5" />
                                            <span>Code</span>
                                        </div>
                                        <div className="h-8 border-b border-[#262626] flex items-center">
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="flex bg-[#1e1e1e] text-[#ffffff99] items-center gap-0.5 p-0 mx-4 cursor-pointer hover:bg-[#2f2f2f] py-0.5 px-2 rounded-sm font-[400]"
                                                    >
                                                        {formatLanguage(selectedLanguage ?? "")}
                                                        <ChevronDown className="h-4 w-4" color="#ffffff99" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 bg-[#262626] border-[#333] w-auto min-w-fit max-w-max">
                                                    <Command className="bg-[#262626] text-[#ffffff99]">
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {problem.languages.map((lang) => (
                                                                    <CommandItem
                                                                        key={lang.id}
                                                                        className="px-3 py-1.5 cursor-pointer !text-[#ffffff99] !bg-[#262626] hover:!bg-[#444] hover:!text-[#ffffff99]"
                                                                        onSelect={() => handleLanguageSelect(lang.id, lang.name)}
                                                                    >
                                                                        <Check
                                                                            className={`${selectedLanguageId === lang.id
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                                }`}
                                                                            color="#ffffff99"
                                                                        />
                                                                        {formatLanguage(lang.name)}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="h-full pl-1.5">
                                            <Editor
                                                className="mt-2.5"
                                                theme="vs-dark"
                                                language={selectedLanguage ?? undefined}
                                                value={userCode}
                                                onChange={(value) => handleCodeChange(value ?? "")}
                                                options={{
                                                    minimap: { enabled: false },
                                                    wordWrap: "on",
                                                    tabSize: 4,
                                                    insertSpaces: true,
                                                    detectIndentation: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ResizablePanel>

                            <ResizableHandle className="bg-[#0f0f0f] !h-[2px] hover:bg-[#1990ff] rounded-md" />

                            <ResizablePanel defaultSize={30} minSize={10}>
                                <div className="h-full pl-0.5 pt-0.5">
                                    <div className="bg-[#1e1e1e] h-full rounded-md">
                                        <div className="flex bg-[#262626] rounded-t-md h-9 items-center px-2 gap-0.5">
                                            <SquareCheck color="#28c244" className="h-4" />
                                            <span>Test Results</span>
                                        </div>
                                    </div>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
