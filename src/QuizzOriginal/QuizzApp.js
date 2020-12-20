import Modal from './Modal';
import React, { useEffect } from 'react';

import { QuizzContext } from './context';

import './quizz.css';
import SetupForm from './SetupForm';

function QuizzApp() {
  const {
    waiting,
    questions,
    index,
    correct,
    handleNextQuestion,
    handleAnswers,
    showModal,
  } = React.useContext(QuizzContext);

  // api treba vreme da se loaduje pa zato imam zakrpe

  let answerArr = [];
  let corrected;

  if (questions[index]) {
    const { correct_answer, incorrect_answers } = questions[index];

    answerArr = [...incorrect_answers];

    const tempIndex = Math.floor(Math.random() * 4);

    if (tempIndex === 3) {
      answerArr.push(correct_answer);
    } else {
      answerArr.push(answerArr[tempIndex]);
      answerArr[tempIndex] = correct_answer;
    }

    corrected = correct_answer;
  }

  if (waiting) {
    return <SetupForm />;
  }

  return (
    <>
      <main>
        {showModal && <Modal />}
        <div className="quiz">
          <p className="correct-answers">
            correct_answer: {`${correct} / ${index}`}
          </p>

          <h2
            dangerouslySetInnerHTML={{ __html: questions[index]?.question }}
          />

          {answerArr.map((item, index) => {
            return (
              <h4
                onClick={() => handleAnswers(item === corrected)}
                key={index}
                className="answer-btn"
              >
                {item}
              </h4>
            );
          })}

          <button onClick={handleNextQuestion} className="next-question">
            Next Question
          </button>
        </div>
      </main>
    </>
  );
}

export default QuizzApp;
