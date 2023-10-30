import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PollTag from "./index"; 

test("renders PollTag component", () => {
  render(<PollTag TagName="Sample Tag" />);
  expect(screen.getByText("Sample Tag")).toBeInTheDocument();
});
