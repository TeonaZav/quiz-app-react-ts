import { useState } from "react";
import { IQuizItem } from "../types/quiz-types";
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function PlayQuiz(p: { quizData: IQuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentItem: IQuizItem = p.quizData[currentQuizItemIndex];
  const availableAnswers: string[] = [
    currentItem.correct_answer,
    ...currentItem.incorrect_answers,
  ];
  const radioList = availableAnswers.map((answer: string) => (
    <Radio key={answer} value={answer}>
      <Text dangerouslySetInnerHTML={{ __html: answer }}></Text>
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
        value={""}
        onChange={() => setCurrentQuizItemIndex(currentQuizItemIndex + 1)}
      >
        <SimpleGrid column={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
    </Flex>
  );
}
