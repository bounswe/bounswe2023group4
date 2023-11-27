import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./index.jsx";
import getProfileMe from "../../api/requests/profileMe.jsx";
import getProfile from "../../api/requests/profile.jsx";
import * as reactRouterDom from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

// Mocking modules and data
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../api/requests/profileMe.jsx");
jest.mock("../../api/requests/profile.jsx");

const mockProfileMeResponse = {
  id: 6,
  userId: 6,
  username: "sell",
  email: "selin2001a@gmail.com",
  profile_picture: "profile_pic_url",
  points: 10000,
  biography: "selin",
  birthday: null,
  isHidden: null,
  badges: [],
};
const mockProfileResponse = {
  id: 4,
  userId: 4,
  username: "otheruser",
  email: "a@b.com",
  profile_picture: null,
  points: 10000,
  biography: null,
  birthday: null,
  isHidden: null,
  badges: [],
};
const mockNavigate = jest.fn();

describe("Profile Component", () => {
  beforeEach(() => {
    reactRouterDom.useParams.mockReturnValue({ username: "sell" });
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
    getProfileMe.mockResolvedValue(mockProfileMeResponse);
    getProfile.mockResolvedValue(mockProfileResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders Profile component for the logged-in user", async () => {
    localStorage.setItem("username", "sell");
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(async () => {
      expect(
        await screen.getByText(mockProfileMeResponse.username)
      ).toBeDefined();
    });

    expect(getProfileMe).toHaveBeenCalled();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    // Check for Edit Profile button
    const editButton = await screen.getByText("Edit Profile");
    expect(editButton).toBeInTheDocument();
  });

  test("renders Profile component for a different user", async () => {
    localStorage.setItem("username", "sell");
    reactRouterDom.useParams.mockReturnValue({ username: "otheruser" });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(getProfile).toHaveBeenCalled();

    // Check if Follow button is rendered for a different user
    await waitFor(() => {
      expect(screen.getByText("Follow")).toBeInTheDocument();
    });
  });

  test("navigates to edit profile page on clicking Edit Profile", async () => {
    localStorage.setItem("username", "sell");
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(async () => expect(await screen.getByText("Edit Profile")).toBeInTheDocument());

    await act(async () => {
      const editButton = await screen.getByText("Edit Profile");
      await editButton.click();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `/editProfile/${mockProfileMeResponse.username}`
      );
    });
  });

  test("renders profile picture when available", async () => {
    localStorage.setItem("username", "sell");
    getProfileMe.mockResolvedValue({
      ...mockProfileMeResponse,
      profile_picture: "profile_pic_url",
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      const profileImage = screen.getByAltText("profileImage");
      expect(profileImage).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(profileImage.src).toBe("http://localhost/profile_pic_url");
    });
  });
});