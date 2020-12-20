import React from 'react';

import { QuizzContext } from './context';

function SetupForm() {
  const { handleChange, handleSubmit, quiz } = React.useContext(QuizzContext);

  return (
    <div className="quiz">
      <h2>Kviz</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="questions">Broj pitanja</label>
        <input
          className="form-input"
          name="amount"
          type="number"
          min={1}
          max={50}
          onChange={handleChange}
          value={quiz.amount}
        />

        <label htmlFor="questions">Kategorije</label>
        <select className="form-input" name="category" value={quiz.category} onChange={handleChange}>
          <option value="sports">sports</option>
          <option value="politics">politics</option>
          <option value="history">history</option>
        </select>

        <label htmlFor="questions">tezina</label>
        <select
          className="form-input"
          name="difficulty"
          onChange={handleChange}
          value={quiz.difficulty}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <button className="submit-btn">Pocni</button>
      </form>
    </div>
  );
}

export default SetupForm;
