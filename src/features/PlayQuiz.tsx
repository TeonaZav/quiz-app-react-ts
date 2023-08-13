import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { IQuizItem } from "../types/quiz-types";
import {
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";

import valid from "../assets/lottie/valid.json";
import invalid from "../assets/lottie/invalid.json";
import TimerProgress from "./Timer";

export default function PlayQuiz(p: {
  quizData: IQuizItem[];
  onFinished: (history: boolean[]) => void;
}) {
  const [answer, setAnswer] = useState<string>();
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentItem: IQuizItem = p.quizData[currentQuizItemIndex];
  const [history, setHistory] = useState<boolean[]>([]);
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  useEffect(() => {
    setAvailableAnswers(
      [currentItem.correct_answer, ...currentItem.incorrect_answers].sort(
        () => Math.random() - 0.5
      )
    );
  }, [currentQuizItemIndex]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
      setHistory([...history, isValid]);
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentItem.correct_answer;
  };

  const renderProgressBar = () => {
    return (
      <HStack>
        {p.quizData.map((_, i) => {
          return (
            <Box
              key={`${i}/${p.quizData[i].id}`}
              h={3}
              w={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? "gray.200"
                  : history[i]
                  ? "green.300"
                  : "red.300"
              }
            ></Box>
          );
        })}
      </HStack>
    );
  };

  const radioList = availableAnswers.map((availableAnswer: string) => (
    <Radio key={availableAnswer} value={availableAnswer}>
      <Text
        dangerouslySetInnerHTML={{ __html: availableAnswer }}
        color={
          questionStatus === "unanswered"
            ? "black"
            : isValidAnswer(availableAnswer)
            ? "green.400"
            : "red.400"
        }
      ></Text>
    </Radio>
  ));

  const failQuestion = () => {
    setHistory([...history, false]);
    setQuestionStatus("invalid");
  };

  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"}>
      {renderProgressBar()}

      {questionStatus === "unanswered" && (
        <Box position={"absolute"} top={50} right={50}>
          <TimerProgress max={10} onFinished={failQuestion} />
        </Box>
      )}

      <Heading
        fontSize={"2xl"}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentItem.question }}
      ></Heading>

      <RadioGroup
        value={answer}
        onChange={questionStatus === "unanswered" ? setAnswer : undefined}
      >
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: 100, height: 150 }}
        animationData={
          questionStatus === "unanswered"
            ? null
            : questionStatus === "valid"
            ? valid
            : invalid
        }
        onComplete={() => {
          if (currentQuizItemIndex < p.quizData.length - 1) {
            setCurrentQuizItemIndex(currentQuizItemIndex + 1);
            setQuestionStatus("unanswered");
          } else {
            p.onFinished(history);
          }
        }}
      />
    </Flex>
  );
}
