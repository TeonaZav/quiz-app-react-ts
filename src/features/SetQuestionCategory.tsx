import { useState, useEffect } from "react";
import { IQuizCategory } from "../types/quiz-types";
import { QuizAPI } from "../api/quiz-api";

export default function SetQuestionCategory() {
  const [categories, setCategories] = useState<IQuizCategory[]>([]);

  async function fetchCategories() {
    const result = await QuizAPI.fetchCategories();
    setCategories(result);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return <>SetQuestionCategory</>;
}
