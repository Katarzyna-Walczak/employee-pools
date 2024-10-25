import { handleSaveQuestionAnswer } from "./users";
import { saveQuestionAnswer } from "../utils/api";

describe("handleSaveQuestionAnswer", () => {
  it("will save question answer if correctly formatted data is passed", async () => {
    const answer = "Build our new application with Javascript";
    const qid = "xj352vofupe1dqz9emx13r";
    const option = "optionOne";

    const result = await handleSaveQuestionAnswer(answer, qid, option);
    expect(result).toBeTruthy();
  });

  it("will return an error if incorrect data is passed", async () => {
    const answer = "Build our new application with Javascript";
    const qid = "xj352vofupe1dqz9emx13r";
    const authedUser = "tylermcginnis";
    const error = "Please provide authedUser, qid, and answer";

    await expect(saveQuestionAnswer(authedUser, qid)).rejects.toMatch(error);
    await expect(saveQuestionAnswer(qid, answer)).rejects.toMatch(error);
    await expect(saveQuestionAnswer(authedUser, answer)).rejects.toMatch(error);
  });
});
