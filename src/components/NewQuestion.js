import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NewQuestion = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleChange = (e) => {
    const option = e.target.value;
    if (e.target.id === "optionOne") {
      setOptionOne(option);
    } else {
      setOptionTwo(option);
    }
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));

    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <div className="question-page">
      <h2>Would You Rather?</h2>
      <p>Create Your Own Poll</p>
      <div className="new-question">
        <h5>First Option</h5>
        <TextField
          fullWidth
          id="optionOne"
          label="Option One"
          variant="outlined"
          value={optionOne}
          onChange={handleChange}
        />
        <h5>Second Option</h5>
        <TextField
          fullWidth
          id="optionTwo"
          label="Option Two"
          variant="outlined"
          value={optionTwo}
          onChange={handleChange}
        />
        <Button
          sx={{ margin: 4, textTransform: "capitalize" }}
          variant="contained"
          onClick={handleSubmitQuestion}
        >
          Submit
        </Button>
        {/* <button className="vote submit-new-question">Submit</button> */}
      </div>
    </div>
  );
};

export default connect()(NewQuestion);
