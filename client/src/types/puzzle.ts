// 謎解きロジック用の型定義

export interface PuzzleAnswer {
  id: string;
  storyId: number;
  answer: string;
  nextRoute: string;
}

export interface PuzzleState {
  currentStory: number;
  solvedPuzzles: Set<string>;
  unlockedHiddenPages: Set<number>;
}

export const PUZZLE_ANSWERS: Record<string, PuzzleAnswer> = {
  mystery: {
    id: 'puzzle1',
    storyId: 1,
    answer: 'mystery',
    nextRoute: '/success/1',
  },
  '42': {
    id: 'puzzle2',
    storyId: 1,
    answer: '42',
    nextRoute: '/success/1',
  },
  next: {
    id: 'puzzle3',
    storyId: 2,
    answer: 'next',
    nextRoute: '/success/2',
  },
  cipher: {
    id: 'puzzle4',
    storyId: 2,
    answer: 'cipher',
    nextRoute: '/success/2',
  },
};

// 隠しページアクセス用の特別なキーワード
export const HIDDEN_PAGE_KEYWORDS: Record<string, string> = {
  'hidden world': '/hidden/1',
};

export function normalizePuzzleInput(input: string): string {
  return input.toLowerCase().trim();
}

export function checkPuzzleAnswer(input: string): PuzzleAnswer | null {
  const normalized = normalizePuzzleInput(input);
  
  // 謎の答えをチェック
  for (const [key, answer] of Object.entries(PUZZLE_ANSWERS)) {
    if (normalizePuzzleInput(key) === normalized) {
      return answer;
    }
  }
  
  return null;
}

export function checkHiddenPageKeyword(input: string): string | null {
  const normalized = normalizePuzzleInput(input);
  
  // 隠しページキーワードをチェック
  for (const [key, route] of Object.entries(HIDDEN_PAGE_KEYWORDS)) {
    if (normalizePuzzleInput(key) === normalized) {
      return route;
    }
  }
  
  return null;
}
