import { useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../index.css";
import SetQuestionQty from "./features/SetQuestionQty";
import SetQuestionCategory from "./features/SetQuestionCategory";
import SetQuestionDifficulty from "./features/SetQuestionDifficulty";
import { IFetchQuizParams, QuizDifficulty, QuizType } from "./types/quiz-types";
import { QuizAPI } from "./api/quiz-api";
import { IQuizCategory } from "./types/quiz-types";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<IFetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Eazy,
    type: QuizType.Multiple,
  });
  const [categories, setCategories] = useState<IQuizCategory[]>([]);

  async function fetchCategories() {
    const result = await QuizAPI.fetchCategories();
    setCategories([{ id: -1, name: "Mixed" }, ...result]);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg}></Image>
    </Flex>
  );
  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount: amount });
              setStep(Step.SetQuestionCategory);
            }}
            max={30}
            min={5}
            step={5}
            defaultValue={10}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === "-1" ? "" : category,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
            categories={categories}
          />
        );
      case Step.SetQuestionDifficulty:
        return (
          <SetQuestionDifficulty
            onClickNext={(difficulty: QuizDifficulty) => {
              setQuizParams({
                ...quizParams,
                difficulty: difficulty,
              });
              setStep(Step.Play);
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box py={"10"} h="100%">
      {header}
      <Image
        src={bubbleImg}
        position={"absolute"}
        zIndex={-1}
        right={-120}
        top={100}
      ></Image>
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}

export default App;
