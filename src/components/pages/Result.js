import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;

  const { loading, error, answers } = useAnswers(id);

  function calculate() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndices = [],
        checkedIndices = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndices.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndices.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndices, checkedIndices)) {
        score = score + 5;
      }
    });

    return score;
  }

  const userScore = calculate();

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
