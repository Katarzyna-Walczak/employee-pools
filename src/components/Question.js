import { formatDate, formatQuestion } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";

const Question = (props) => {
  const navigate = useNavigate();
  // if (props.question === null) {
  //   return <p>This question doesn't exist</p>;
  // }

  const { id, userLogin, timestamp } = props.question;

  const onQuestionClick = (e, id) => {
    e.preventDefault();

    navigate(`/questions/${id}`);
  };

  return (
    <div className="question-card-info" onClick={(e) => onQuestionClick(e, id)}>
      <span>{userLogin}</span>
      <p>{timestamp}</p>
      {/* <Button
        sx={{ margin: 1, textTransform: "capitalize" }}
        variant="outlined"
        onClick={(e) => onQuestionClick(e, id)}
      >
        Show
      </Button> */}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(Question);
