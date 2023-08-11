import { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import "../index.css";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg}></Image>
    </Flex>
  );

  return (
    <Box py={"10"} h="100%">
      {header}
      <Box>Todo</Box>
    </Box>
  );
}

export default App;
