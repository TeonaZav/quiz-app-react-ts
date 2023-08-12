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
