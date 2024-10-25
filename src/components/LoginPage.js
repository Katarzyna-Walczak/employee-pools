import { connect } from "react-redux";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const LoginPage = (props) => {
  const { users } = props;
  const userIds = Object.keys(users);
  const options = userIds.map((id) => {
    const user = users[id];
    return user.id;
  });

  const [password, setPassword] = useState("");

  const setUserPassword = (e) => {
    // console.log("e: ", e, e.target.innerText);
    setPassword(users[e.target.innerText].password);
  };

  return (
    <div className="question-page">
      <h2>Employee Polls</h2>
      <img
        src="https://avatar.iran.liara.run/public/83"
        alt="Avatar"
        className="avatar"
      ></img>
      <h2>Log In</h2>
      <div className="new-question">
        <h5>User</h5>
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField fullWidth label="User" variant="outlined" {...params} />
          )}
          onChange={(e) => setUserPassword(e)}
        />
        {/* <TextField fullWidth label="User" variant="outlined" /> */}
        <h5>Password</h5>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={password}
        />
        <Button
          sx={{ margin: 4, textTransform: "capitalize" }}
          variant="contained"
        >
          Submit
        </Button>
        {/* <button className="vote submit-new-question">Submit</button> */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(LoginPage);
