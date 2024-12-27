import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      // database related works
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapShot = await get(quizQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setQuestions((prevQuestions) => {
            const newQuestions = Object.values(snapShot.val());
            // a set to keep track of uniques questions
            const uniqueQuestions = new Set(
              prevQuestions.map((question) => question.index)
            );
            // filter out arrays with duplicate questions
            const filteredQuestions = newQuestions.filter(
              (question) => !uniqueQuestions.has(question.index)
            );
            // concatenate the unique arrays with the previous questions
            return [...prevQuestions, ...filteredQuestions];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
