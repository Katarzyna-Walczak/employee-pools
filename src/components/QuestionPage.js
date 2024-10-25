import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { BarChart } from "@mui/x-charts/BarChart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { saveQuestionAnswer } from "../utils/api";
import { handleSaveQuestionAnswer } from "../actions/users";
import { formatQuestion } from "../utils/helpers";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  if (props.question === null) {
    return <p>This question doesn't exist</p>;
  }
  // const { users, questions } = props;
  // const userIds = Object.keys(users);
  // const questionIds = Object.keys(questions);
  const {
    id,
    userLogin,
    userAvatar,
    optionOne,
    votesOptionOne,
    optionTwo,
    votesOptionTwo,
    totalVotes,
  } = props.question;
  const questionAnswer = props.questionAnswer;
  console.log("props: ", props);

  const selectedQuestion = [{ optionOne: optionOne }, { optionTwo: optionTwo }];

  const series = selectedQuestion.map((name, i) => {
    return {
      data: [
        Object.keys(name).toString() == "optionOne"
          ? votesOptionOne
          : votesOptionTwo,
      ],
      label: `${Object.values(name)}`,
      id: `${i}`,
      stack: "total",
      color: [
        questionAnswer == Object.keys(name).toString() ? "#2e8b57" : "#72A0C1",
      ], //
      valueFormatter: (value) => `${((value / totalVotes) * 100).toFixed(0)}%`,
    };
  });

  const dataset = [
    {
      label: "Would You Rather?",
    },
  ];

  const chartSetting = {
    xAxis: [
      {
        label: "number of voters",
        tickNumber: Number(totalVotes),
      },
    ],
    width: 500,
    height: 200,
    slotProps: { legend: { hidden: true } },
  };

  const handleSelectAnswer = (e, option) => {
    e.preventDefault();
    console.log("2: ", id, e.target.innerText, option[0]);
    const answer = e.target.innerText;
    props.dispatch(handleSaveQuestionAnswer(answer, id, option[0]));
  };

  return (
    <div className="question-page">
      {/* {questionIds
        .filter(function (questionId) {
          return questions[questionId];
        })
        .map(function (questionId) {
          return ( */}
      <div>
        <h2>Poll by {userLogin}</h2>
        <img src={userAvatar} alt="Avatar" className="avatar"></img>
        {/* <img
                src={users[userId].avatarURL}
                alt="Avatar"
                class="avatar"
              ></img> */}
        <h2>Would You Rather?</h2>
        <div className="question-card center">
          {selectedQuestion.map((name, i) => {
            return (
              <div
                className={
                  questionAnswer == Object.keys(name).toString()
                    ? "question-card-answered"
                    : questionAnswer
                    ? "question-card-not-answered"
                    : "question-card-info"
                }
                key={i}
                onClick={(e) => handleSelectAnswer(e, Object.keys(name))}
              >
                <p>{Object.values(name)}</p>
                {/* <button className="vote">Click</button> */}
                {/* <Button
              sx={{ margin: 1, textTransform: "capitalize" }}
              variant="outlined"
            >
              Click
            </Button> */}
              </div>
            );
          })}

          {/* <div className="question-card-info">
            <p>{optionTwo}</p>
          </div> */}
        </div>
        {questionAnswer && (
          <div className="center">
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: "band", dataKey: "label" }]}
              series={series}
              layout="horizontal"
              {...chartSetting}
            />
          </div>
        )}
      </div>
      {/* );
        })} */}
    </div>
  );
};

const mapStateToProps = ({ users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const AUTHED_ID = "tylermcginnis";
  const authedUser = users ? users[AUTHED_ID] : null;
  const questionAnswer = authedUser ? authedUser.answers : null;

  return {
    users,
    authedUser: authedUser,
    questions,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    questionAnswer: questionAnswer ? questionAnswer[id] : null,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
