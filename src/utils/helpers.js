export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question, user, authedUser) {
  const { id, author, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL, answers, questions } = user;

  return {
    id,
    userLogin: author,
    userName: name,
    userAvatar: avatarURL,
    optionOne: optionOne.text,
    votesOptionOne: optionOne.votes.length,
    optionTwo: optionTwo.text,
    votesOptionTwo: optionTwo.votes.length,
    totalVotes: optionOne.votes.length + optionTwo.votes.length,
    timestamp: formatDate(timestamp),
    // answers: Object.keys(answers).length,
    // questions: questions.length,
  };
}
