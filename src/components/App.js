import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import LoginPage from "./LoginPage";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const [loading, setLoading] = useState(false); //true

  return (
    <Fragment>
      {!loading && <Nav />}
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/add" element={<NewQuestion />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
