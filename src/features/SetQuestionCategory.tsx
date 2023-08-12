import { useState } from "react";
import { IQuizCategory } from "../types/quiz-types";
import {
  Flex,
  Heading,
  Button,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function SetQuestionCategory(p: {
  categories: IQuizCategory[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioList = p.categories.map((category: IQuizCategory) => (
    <Radio key={category.id} value={category.id.toString()}>
      {category.name}
    </Radio>
  ));

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Which topic?
        </Heading>
      </Flex>
      <RadioGroup
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
        display={"flex"}
        justifyContent={"center"}
      >
        <SimpleGrid columns={[1, 3, 4]} spacing={"4"}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Button
        onClick={() => ""}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set difficulty
      </Button>
    </>
  );
}
