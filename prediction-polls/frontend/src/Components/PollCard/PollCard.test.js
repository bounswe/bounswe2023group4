import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import PollCard from "./index";

const mockPollData = {
  tags: ["tag1", "tag2"],
  question: "Sample Question?",
  options: [
    { title: "Option 1", votes: 10 },
    { title: "Option 2", votes: 20 },
  ],
  isCustomPoll: false,
  comments: [{}, {}], 
  creatorImage: "https://www.w3schools.com/howto/img_lights_wide.jpg",
  creatorName: "John Doe",
  closingDate: "1 day",
  rejectVotes: "2 votes",
};

test('renders PollCard component and checks interactions', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PollCard PollData={mockPollData} />
      </MemoryRouter>
    );

  expect(screen.getByText("Sample Question?")).toBeInTheDocument();

  expect(screen.getByText("Option 1")).toBeInTheDocument();
  expect(screen.getByText("Option 2")).toBeInTheDocument();

  expect(screen.getByText("tag1")).toBeInTheDocument();
  expect(screen.getByText("tag2")).toBeInTheDocument();
});
