import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { IQuizItem } from "../types/quiz-types";
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import valid from "../assets/lottie/valid.json";
import invalid from "../assets/lottie/invalid.json";

export default function PlayQuiz(p: { quizData: IQuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentItem: IQuizItem = p.quizData[currentQuizItemIndex];
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  const [answer, setAnswer] = useState<string>();
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

  useEffect(() => {
    setAvailableAnswers(
      [currentItem.correct_answer, ...currentItem.incorrect_answers].sort(
        () => Math.random() - 0.5
      )
    );
  }, [currentQuizItemIndex]);

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentItem.correct_answer;
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

  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"}>
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
          setQuestionStatus("unanswered");
          setCurrentQuizItemIndex(currentQuizItemIndex + 1);
        }}
      />
    </Flex>
  );
}
