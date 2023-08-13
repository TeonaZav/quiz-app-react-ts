export interface IFetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export enum QuizDifficulty {
  Mixed = "",
  Eazy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}

export interface IQuizCategory {
  id: number;
  name: string;
}
export interface IFetchQuizCategories {
  trivia_categories: IQuizCategory[];
}

export interface IFetchQuizResp {
  response_code: number;
  results: IQuizItem[];
}

export interface IQuizItem {
  id: number;
  category: number;
  difficulty: QuizDifficulty;
  type: QuizType;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
