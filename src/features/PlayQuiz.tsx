import { IQuizItem } from "../types/quiz-types";

export default function PlayQuiz(p: { quizData: IQuizItem[] }) {
  console.log(p.quizData);
  return <>Play quiz</>;
}
