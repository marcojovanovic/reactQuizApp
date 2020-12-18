import Modal from './Modal' 
import React, { useEffect } from 'react';

import { QuizzContext } from './context';

import './quizz.css';

function QuizzApp() {
  const { questions, index, nextQuestionAction, correct, getCorrectAnswer, showModal } = React.useContext(QuizzContext);

  const {
    question,
    incorrect_answers,
    correct_answer,
    nexQuestionAction,

  } = questions;

  const answers = [correct_answer, incorrect_answers].flat();

  return (
    <>
    <main>
      <div className="quiz">

          <h5>CorrectAnswer:{correct}/10</h5>

        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>

        {answers.map((item, index) => {
          return (
            <h5 onClick={()=>getCorrectAnswer(item === correct_answer)}className="answer-btn" key={index}>
              {item}
            </h5>
          );
        })}

        <button onClick={nextQuestionAction} className="next-question">
          Next Question
        </button>
      </div>

  
    </main>
    {showModal && <Modal /> }
    </>
  );
}

export default QuizzApp;
