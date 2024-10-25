import * as React from "react";
import { render } from "@testing-library/react";
import Multiply from "./Multiply";

/*
Test that if no name prop is provided, the unit test's snapshot will match one that only has "Welcome!" within the h1 tags.
Test that if a name prop is provided, the unit test's snapshot will match one that has "Welcome back {whichever name you provided}!" within the h1 tags.
*/

describe("getUserById", () => {
  it("matches the snapshot when a name is passed", () => {
    var component = render(<Multiply name={"Mike"} />);
    // expect(component).toMatchSnapshot();
  });
  it("matches the snapshot when no name is passe", () => {
    var component = render(<Multiply />);
    // expect(component).toMatchSnapshot();
  });
});
