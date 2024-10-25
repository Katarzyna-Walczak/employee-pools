import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Leaderboard = (props) => {
  const { sortedIds, users } = props;
  // const { users, questions } = props;
  // const userIds = Object.keys(users);

  return (
    <Paper
      elevation={1}
      variant="outlines"
      sx={{ margin: 8, border: "1px solid #E0E0E0" }}
    >
      <Table aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="center">Answered</TableCell>
            <TableCell align="center">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {userIds
            .filter(function (userId) {
              return users[userId];
            })
            .map(function (userId) {
              return ( */}
          {sortedIds.map((id) => {
            const user = users[id];
            return (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="question-card">
                    <img
                      src={user.avatarURL}
                      alt="Avatar"
                      className="avatar-small"
                    ></img>
                    <div>
                      <h4 className="user-name">{user.name}</h4>
                      <span className="user-id">{user.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">
                  {Object.keys(user.answers).length}
                </TableCell>
                <TableCell align="center">{user.questions.length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = ({ users, questions }) => {
  return {
    users,
    questions,
    sortedIds: Object.keys(users).sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    ),
  };
};

export default connect(mapStateToProps)(Leaderboard);
