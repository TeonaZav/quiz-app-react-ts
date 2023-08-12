import axios from "axios";
import { IFetchQuizCategories, IQuizCategory } from "../types/quiz-types";

const BASE_URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<IQuizCategory[]> {
    const { data } = await axios.get<IFetchQuizCategories>(
      `${BASE_URL}/api_category.php`
    );
    return data.trivia_categories;
  }
}
