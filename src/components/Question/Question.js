import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { shuffleArray } from "../../util";
import "./Question.scss";

function Question({ question, handleNextButtonClick }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const shuffledAnswers = useMemo(
    () =>
      shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    [question]
  );

  const isAnswerCorrect = () => selectedAnswer === question.correct_answer;

  const handleButtonClick = () => {
    isAnswerCorrect()
      ? toast.success("You are correct", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.error("You are incorrect");

    setSelectedAnswer(null);
    handleNextButtonClick();
  };

  return (
    <div className="question">
      <p
        className="question__question"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <form>
        <ul className="question__answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="question__answer">
              <label className="question__label">
                <input
                  className="question__input"
                  type="radio"
                  name="answer"
                  defaultChecked={answer === selectedAnswer}
                  onChange={() => setSelectedAnswer(answer)}
                />
                {answer}
              </label>
            </li>
          ))}
        </ul>
      </form>

      <button
        className="question__next"
        type="button"
        onClick={handleButtonClick}
        disabled={!selectedAnswer}
      >
        Next question
      </button>
    </div>
  );
}

export default Question;
