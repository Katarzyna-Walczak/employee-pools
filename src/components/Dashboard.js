import { useState } from "react";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Question from "./Question";

const Dashboard = (props) => {
  const { users, authedUser, questions, questionIds } = props;
  console.log("users: ", users, questions, authedUser);

  const filterCategories = ["New Questions", "Done"];

  // const userNames = Object.keys(questions);

  return (
    <>
      {filterCategories.map((name) => {
        return (
          <Accordion key={name} defaultExpanded={name === "New Questions"}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="question-card">
                {/* {userNames
        .filter(function (userName) {
          return questions[userName];
        })
        .map(function (userName) { */}
                {questionIds
                  .filter((id) =>
                    name === "Done"
                      ? Object.keys(authedUser.answers).includes(id)
                      : !Object.keys(authedUser.answers).includes(id)
                  )
                  .map((id) => {
                    return <Question key={id} id={id} />;
                  })}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

const mapStateToProps = ({ users, questions }) => {
  const AUTHED_ID = "tylermcginnis";

  return {
    users,
    questions,
    authedUser: users ? users[AUTHED_ID] : null,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(Dashboard);
