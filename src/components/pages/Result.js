import _ from "lodash";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  // const { qna } = state;
  const qna = state?.qna || [];

  const { loading, error, answers } = useAnswers(id);
  const userScore = calculate();

  useEffect(() => {
    console.log("Result component mounted!");
    return () => console.log("Result component unmounted!");
  }, []);

  function calculate() {
    let score = 0;

    if (!answers || !qna || answers.length === 0 || qna.length === 0)
      return score;

    answers.forEach((question, index1) => {
      let correctIndices = [],
        checkedIndices = [];

      if (!qna[index1] || !qna[index1].options) return; // Skip if qna[index1] is missing

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndices.push(index2);
        if (qna[index1]?.options[index2]?.checked) {
          // Safe access
          checkedIndices.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndices, checkedIndices)) {
        score += 5;
      }
    });

    return score;
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
