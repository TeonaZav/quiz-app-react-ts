import { Flex, Heading, Text, Button } from "@chakra-ui/react";

interface IScore {
  history: boolean[];
  onClickNext: () => void;
}

const Score = (props: IScore) => {
  const rightAnswers = props.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / props.history.length;
    if (rightAnswerPercentage < 30) {
      return "You need more practice";
    } else if (rightAnswerPercentage < 50) {
      return "Not bad ! Keep training you'r getting bettr";
    } else if (rightAnswerPercentage < 75) {
      return "Good job!";
    } else {
      return "Whoah ! You did amazing !";
    }
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading fontSize={"3xl"}>Score</Heading>
        <Heading fontSize={"xl"} mt={"5"}>
          {rightAnswers}/{props.history.length}
        </Heading>
        <Text fontWeight={"bold"} mt={20}>
          {renderMessage()}
        </Text>
        <Button
          position="absolute"
          top={"80%"}
          right={"10%"}
          onClick={props.onClickNext}
        >
          New game
        </Button>
      </Flex>
    </>
  );
};
export default Score;
