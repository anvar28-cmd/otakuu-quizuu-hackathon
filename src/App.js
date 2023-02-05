import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Categories from "./components/Categories/Categories";
import Question from "./components/Question/Question";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainVideo from "./assets/Video/anime.mp4";
import "./App.scss";

function App() {
  const [currentCategory, setCurrentCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [step, setStep] = useState(1);

  const handleNextButtonClick = () => {
    if (step >= 10) {
      toast.success("Well done!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setCurrentCategory("");
      setQuestions([]);
      setCurrentQuestion(null);
      setStep(1);
      return;
    }

    setStep(step + 1);
    setCurrentQuestion(questions[step]);
  };

  useEffect(() => {
    if (currentCategory) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=31&difficulty=${currentCategory}&type=multiple`
        )
        .then((response) => {
          const questions = response.data.results;
          console.log(questions);

          setQuestions(questions);

          if (!currentQuestion) {
            setCurrentQuestion(questions[0]);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [currentCategory, currentQuestion]);

  return (
    <div class="home">
      <video className="background__video" autoPlay loop muted>
        <source src={mainVideo} />
      </video>

      <ToastContainer />
      <Categories
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />

      {currentQuestion && (
        <>
          <p className="questionNumber">Question {step} of 10</p>

          <Question
            question={currentQuestion}
            handleNextButtonClick={handleNextButtonClick}
            step={step}
          />
        </>
      )}
    </div>
  );
}

export default App;
