import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  const { authedUser, users } = props;
  console.log("users123: ", users);
  const userIds = Object.keys(users);

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/add" className="nav-link">
            New Question
          </Link>
        </li>
        <div className="question-card float-right">
          <img
            src="https://avatar.iran.liara.run/public/42"
            alt="Avatar"
            className="avatar-small"
          ></img>
          <h5 className="user-information">tylermcginnis</h5>
        </div>
        <li>
          <Link to="/login" className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(Nav);
