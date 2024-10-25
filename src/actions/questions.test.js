import { handleAddQuestion } from "./questions";

describe("handleAddQuestion", () => {
  it("will save question if all expected fields are populated", async () => {
    const optionOne = "Build our new application with Javascript";
    const optionTwo = "Build our new application with Typescript";

    const result = await handleAddQuestion(optionOne, optionTwo);
    expect(result).toBeTruthy();
  });

  it("will return an error if incorrect data is passed", async () => {
    const optionOne = "Build our new application with Javascript";
    const optionTwo = "Build our new application with Typescript";
    // const author = "tylermcginnis";
    const error = "Please provide optionOneText, optionTwoText, and author";

    await expect(handleAddQuestion(optionOne)).rejects.toMatch(error);
    await expect(handleAddQuestion(optionTwo)).rejects.toMatch(error);
  });
});
