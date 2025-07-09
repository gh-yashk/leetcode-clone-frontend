import { fetchAllProblems, type ProblemSummary } from "@/lib/api/problems";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown, Funnel } from "lucide-react";
import { useEffect, useState } from "react";

const getDifficultyClass = (difficulty: string): string => {
    switch (difficulty.toUpperCase()) {
        case 'EASY':
            return 'text-[#1cbaba]';
        case 'MEDIUM':
            return 'text-[#ffb700]';
        case 'HARD':
            return 'text-[#f63737]';
        default:
            return 'text-gray-400';
    }
};

const formatDifficulty = (difficulty: string): string => difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();

type SortState = null | 'asc' | 'desc';

export default function ProblemList() {

    const [problems, setProblems] = useState<ProblemSummary[]>([]);
    const [filter, setFilter] = useState<string>('ALL');
    const [difficultySort, setDifficultySort] = useState<SortState>(null);

    useEffect(() => {
        fetchAllProblems()
            .then(setProblems)
            .catch(err => console.error(err));
    }, []);

    const handleSortToggle = () => {
        setDifficultySort(prev =>
            prev === null ? 'asc' : prev === 'asc' ? 'desc' : null
        );
    };

    const filtered = problems.filter(p =>
        filter === 'ALL' ? true : p.difficulty === filter
    );

    const sorted = [...filtered].sort((a, b) => {
        if (difficultySort === null) return 0;
        const order = { EASY: 1, MEDIUM: 2, HARD: 3 };
        const diff = order[a.difficulty] - order[b.difficulty];
        return difficultySort === 'asc' ? diff : -diff;
    });

    return (
        <>
            <section>

                <div className="p-4 min-h-screen">

                    {/* Controls */}
                    <div className="mb-4 flex flex-wrap items-center gap-4">

                        {/* Filter Dropdown */}
                        <div className="flex items-center gap-2">
                            <button className="rounded-full p-2 bg-[#272727]">
                                <Funnel size={16} />
                            </button>
                            <div className="flex gap-2">
                                {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setFilter(option)}
                                        className={`px-3 py-1 rounded-full border cursor-pointer ${filter === option
                                            ? 'text-[#1a90ff] border-[#1a90ff]'
                                            : 'text-[#f5f5f5] border-[#272727]'
                                            }`}
                                    >
                                        {option === 'ALL'
                                            ? 'All'
                                            : option.charAt(0) + option.slice(1).toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort Button */}
                        <button
                            onClick={handleSortToggle}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#272727] cursor-pointer"
                        >
                            {difficultySort === null && (
                                <ArrowUpDown size={16} className="text-[#f5f5f5]" />
                            )}
                            {difficultySort === 'asc' && (
                                <ArrowDownNarrowWide size={16} className="text-[#1a90ff]" />
                            )}
                            {difficultySort === 'desc' && (
                                <ArrowDownWideNarrow size={16} className="text-[#1a90ff]" />
                            )}
                            <span
                                className={
                                    difficultySort === null ? 'text-[#f5f5f5]' : 'text-[#1a90ff]'
                                }
                            >
                                Difficulty
                            </span>
                        </button>

                    </div>

                    {/* Table */}
                    <table className="w-full border-collapse">
                        <tbody>
                            {sorted.map((p, index) => (
                                <tr
                                    key={p.id}
                                    onClick={() => (window.location.href = `/problems/${p.slug}`)}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-[#272727]' : 'bg-[#1a1a1a]'} rounded-lg`}
                                >
                                    <td className="px-4 py-3 rounded-l-lg">
                                        {p.id}. {p.title}
                                    </td>
                                    <td
                                        className={`px-4 py-3 rounded-r-lg text-center ${getDifficultyClass(p.difficulty)}`}
                                    >
                                        {formatDifficulty(p.difficulty)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </section>
        </>
    )
}