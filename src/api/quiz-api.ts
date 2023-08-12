import axios from "axios";
import {
  IFetchQuizCategories,
  IFetchQuizParams,
  IFetchQuizResp,
  IQuizCategory,
  IQuizItem,
} from "../types/quiz-types";

const BASE_URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<IQuizCategory[]> {
    const { data } = await axios.get<IFetchQuizCategories>(
      `${BASE_URL}/api_category.php`
    );
    console.log(data.trivia_categories);
    return data.trivia_categories;
  }
  static async fetchQuiz(params: IFetchQuizParams): Promise<IQuizItem[]> {
    const { data } = await axios.get<IFetchQuizResp>(`${BASE_URL}/api.php?`, {
      params,
    });
    console.log(data);
    return data.results;
  }
}
