import { useState, useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
let timer: NodeJS.Timer;
export default function TimerProgress(p: {
  max: number;
  onFinished: () => void;
}) {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    if (progress <= 0) {
      p.onFinished();
      clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <CircularProgress max={p.max} value={progress}>
      <CircularProgressLabel>{progress}%</CircularProgressLabel>
    </CircularProgress>
  );
}
