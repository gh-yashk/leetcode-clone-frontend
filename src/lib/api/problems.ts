export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Language {
    id: string;
    name: string;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
}

export interface StarterCodeMap {
    [language: string]: string;
}

export interface ProblemSummary {
    id: number;
    title: string;
    slug: string;
    difficulty: Difficulty;
}

export interface ProblemDetail extends ProblemSummary {
    description: string;
    starterCode: string;
    languages: string;
    testCases: string;
}

export interface ParsedProblemDetail extends ProblemSummary {
    description: string;
    starterCode: StarterCodeMap;
    languages: Language[];
    testCases: TestCase[];
}

export async function fetchAllProblems(): Promise<ProblemSummary[]> {
    const response = await fetch("http://localhost:8081/api/problems");
    if (!response.ok) {
        throw new Error("Failed to fetch problems.");
    }
    return response.json();
}

export async function fetchProblemBySlug(slug: string): Promise<ProblemDetail> {
    const response = await fetch(`http://localhost:8081/api/problems/${slug}`);
    if (!response.ok) {
        throw new Error("Problem not found");
    }
    return response.json();
}

export async function fetchProblemParsed(slug: string): Promise<ParsedProblemDetail> {
    const raw = await fetchProblemBySlug(slug);
    return {
        ...raw,
        starterCode: JSON.parse(raw.starterCode),
        languages: JSON.parse(raw.languages),
        testCases: JSON.parse(raw.testCases),
    };
}
