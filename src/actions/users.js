import { saveQuestionAnswer } from "../utils/api";
import { addQuestionAnswer } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    author,
    id,
  };
}

function addAnswerToUser(authedUser, qid, answer, option) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
    option,
  };
}

export function handleSaveQuestionAnswer(answer, qid, option) {
  console.log("ready to be saved");
  const authedUser = "tylermcginnis";
  return (dispatch, getState) => {
    // const { authedUser } = getState();
    console.log("saved");

    dispatch(addAnswerToUser(authedUser, qid, answer, option));
    dispatch(addQuestionAnswer(authedUser, qid, answer, option));

    return saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer,
    }).catch((error) => {
      console.error("Error saving question answer: ", error);
      throw error;
    });
  };
}
