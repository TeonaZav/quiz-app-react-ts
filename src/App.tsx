import { useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../index.css";
import SetQuestionQty from "./features/SetQuestionQty";
import SetQuestionCategory from "./features/SetQuestionCategory";
import SetQuestionDifficulty from "./features/SetQuestionDifficulty";
import PlayQuiz from "./features/PlayQuiz";
import Score from "./features/Score";
import {
  IFetchQuizParams,
  IQuizItem,
  QuizDifficulty,
  QuizType,
} from "./types/quiz-types";
import { QuizAPI } from "./api/quiz-api";
import { IQuizCategory } from "./types/quiz-types";

enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

function App() {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [quizParams, setQuizParams] = useState<IFetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  const [categories, setCategories] = useState<IQuizCategory[]>([]);
  const [quizData, setQuizData] = useState<IQuizItem[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mixed" },
        ...(await QuizAPI.fetchCategories()),
      ]);
      setStep(Step.SetQuestionQty);
    })();
  }, []);

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg} />
    </Flex>
  );
  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex
            top={0}
            justify="center"
            alignItems="center"
            position="absolute"
            minHeight={"100vh"}
            w={"100%"}
          >
            Loading...
          </Flex>
        );
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }}
            defaultValue={10}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={async (categoryId: string) => {
              setQuizParams({
                ...quizParams,
                category: categoryId == "-1" ? "" : categoryId,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );
      case Step.SetQuestionDifficulty:
        return (
          <SetQuestionDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = {
                ...quizParams,
                difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length > 0) {
                setQuizData(quizResp);
                setStep(Step.Play);
              } else {
                alert(
                  `Couldn't find ${params.amount} questions for this category, restarting game`
                );
                setStep(Step.SetQuestionQty);
              }
            }}
          />
        );
      case Step.Play:
        return (
          <PlayQuiz
            onFinished={(history_: boolean[]) => {
              setHistory(history_);
              setStep(Step.Score);
            }}
            quizData={quizData}
          />
        );

      case Step.Score:
        return (
          <Score
            history={history}
            onClickNext={() => {
              setStep(Step.SetQuestionQty);
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
