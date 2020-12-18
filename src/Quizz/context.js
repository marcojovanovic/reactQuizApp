import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuizzContext = createContext();

const basic_call = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`;

const QuizzProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getTriviaDates();
  }, [index]);

  const getTriviaDates = async () => {
    const res = await axios(basic_call).catch((err) => err);

    if (res) {
      let data = res.data.results;

      if (data.length > 0) {
        setQuestions(data[index]);
      }
    }
  };

  const nextQuestionAction = () => {
    setIndex((prev) => {
      let nextQuestion = prev + 1;

      console.log(nextQuestion);

      if (nextQuestion === 10) {
        setShowModal(true)
        return 0;
      } else {
        return nextQuestion;
      }
    });
  };

  const getCorrectAnswer = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
    }

    nextQuestionAction();
  };

  return (
    <QuizzContext.Provider
      value={{
        questions,
        loading,
        index,
        correct,
        nextQuestionAction,
        getCorrectAnswer,
        showModal
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};

export { QuizzProvider };
