import { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { QuizDifficulty } from "../types/quiz-types";

export default function SetQuestionDifficulty(p: {
  onClickNext: (difficulty: QuizDifficulty) => void;
}) {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  const radioList = Object.values(QuizDifficulty).map(
    (diff: QuizDifficulty) => (
      <Radio key={diff} value={diff}>
        <span style={{ textTransform: "capitalize" }}>
          {diff === QuizDifficulty.Mixed ? "Mixed" : diff}
        </span>
      </Radio>
    )
  );

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Which difficulty?
        </Heading>
      </Flex>
      <RadioGroup
        value={difficulty}
        onChange={setDifficulty as (d: string) => void}
      >
        <VStack>{radioList}</VStack>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(difficulty)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Start
      </Button>
    </>
  );
}
