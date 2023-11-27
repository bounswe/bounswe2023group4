import "@testing-library/jest-dom";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import EditProfile from "./index";
import getProfileMe from "../../api/requests/profileMe";
import updateProfile from "../../api/requests/editProfile";
import uploadProfilePhoto from "../../api/requests/uploadProfilePhoto";
import { MemoryRouter, createMemoryHistory } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

// Mocking modules and data
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
// Mocking API calls
jest.mock("../../api/requests/profileMe");
jest.mock("../../api/requests/uploadProfilePhoto");
jest.mock("../../api/requests/editProfile");
const mockNavigate = jest.fn();

jest.mock(window.matchMedia);

global.URL.createObjectURL = jest.fn();

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

describe("EditProfile Component", () => {
  beforeEach(() => {
    global.window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    reactRouterDom.useParams.mockReturnValue({ username: "sell" });
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
    getProfileMe.mockResolvedValue(mockProfileMeResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly and makes an API call to fetch user data", async () => {
    getProfileMe.mockResolvedValue(mockProfileMeResponse);

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(async () => {
      expect(screen.getByPlaceholderText("username")).toHaveValue(
        mockProfileMeResponse.username
      );
    });
  });

  it("handles image upload", async () => {
    global.URL.createObjectURL.mockReturnValue("tst_img.png");
    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    const file = new File(["blablabla"], "tst_img.png", { type: "image/png" });
    const input = screen.getByTestId("fileInput");
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText("Profile").src).toContain("tst_img.png");
    });
  });

  it("navigates to profile page after successful update", async () => {
    getProfileMe.mockResolvedValue(mockProfileMeResponse);
    uploadProfilePhoto.mockResolvedValue({ success: true });
    updateProfile.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(async () => {
      expect(getProfileMe).toHaveBeenCalled();
    });

    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/profile/sell");
    });
  });
  // Add more tests for form interaction, image upload, navigation, etc.
  it("submits form and calls update API", async () => {
    updateProfile.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    const aboutInput = screen.getByPlaceholderText("about");
    fireEvent.change(aboutInput, { target: { value: "New bio" } });

    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          biography: "New bio",
        })
      );
    });
  });
});
