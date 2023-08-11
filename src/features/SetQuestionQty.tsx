import { useState } from "react";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Heading,
} from "@chakra-ui/react";

interface IProps {
  max: number;
  min: number;
  step: number;
  defaultValue: number;
}

export default function SetQuestionQty(p: IProps) {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);
  const renderMarks = (): JSX.Element[] => {
    const marks = [];
    for (let i = p.min; i <= p.max; i += p.step) {
      marks.push(
        <SliderMark key={i} ml={-2} pt={4} value={i}>
          {i}
        </SliderMark>
      );
    }
    return marks;
  };
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading as="h1" fontSize="3xl" mb={20}>
        How many questions?
      </Heading>
      <Slider
        value={sliderValue}
        maxW={400}
        max={p.max}
        min={p.min}
        step={p.step}
        colorScheme="yellow"
        aria-label="slider-ex-6"
        onChange={(val) => setSliderValue(val)}
      >
        {renderMarks()}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
}
