import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addQuestionToUser } from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addQuestionAnswer(authedUser, qid, answer, option) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
    option,
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    // const { authedUser } = getState();

    return saveQuestion({
      author: "tylermcginnis", //authedUser
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      })
      .catch((error) => {
        console.error("Error saving question: ", error);
        throw error;
      });
  };
}

// export function handleSaveQuestionAnswer(answer, id) {
//   return (dispatch, getState) => {/
//     const { authedUser } = getState();

//     return saveQuestionAnswer({
//       authedUser: "tylermcginnis", //authedUser
//       qid: id,
//       answer: answer,
//     }).then((answer) => dispatch(addQuestionAnswer(authedUser, id, answer)));
//   };
// }

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
