import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuizzContext = createContext();

//const basic_call = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`;


const table = {
  sports: 21,
  history: 23,
  politics: 24,
}


const QuizzProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'history',
    difficulty: 'easy',
  });

  const fetchQuestions = async (url) => {
    let res = await axios(url).catch((err) => err);

    if (res) {
      let data = res.data.results;
     

      if (data.length > 0) {
        setQuestions(data);
         setWaiting(false);
        
      }
    }
  };

  const handleNextQuestion = () => {
    setIndex((prev) => {
      let nextQuestion = prev + 1;

      if (nextQuestion === questions.length) {
        setShowModal(true);

        return 0;
      } else {
        return nextQuestion;
      }
    });
  };

  const handleAnswers = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
    }

    handleNextQuestion();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setQuestions([]);
    setCorrect(0);
    setWaiting(true);
  };

  const handleChange = (e) => {
    console.log(e.target.name);

    const name = e.target.name;

    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz

    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  };

  return (
    <QuizzContext.Provider
      value={{
        waiting,
        index,
        correct,
        questions,
        showModal,
        handleNextQuestion,
        handleAnswers,
        openModal,
        closeModal,
        showModal,
        handleChange,
        handleSubmit,
        quiz
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};

export { QuizzProvider };
