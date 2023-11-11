import React, { useState } from 'react';
import fetchQuestions from '../services/services.js'; 

function QuestionFetcher() {
  const [questions, setQuestions] = useState([]);
  const categories = [9, 10, 11];

  const handleCategorySelection = async (category) => {
    const fetchedQuestions = await fetchQuestions(category);
    setQuestions(fetchedQuestions);
  };

  return (
    <div>
      <h1>Trivia Questions</h1>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelection(category)}
          >
            Category {category}
          </button>
        ))}
      </div>
      <div>
        {questions.length > 0 && (
          <div>
            <h2>All Questions:</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question.question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionFetcher;
