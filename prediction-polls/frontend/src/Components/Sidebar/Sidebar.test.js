import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import Sidebar from "./index"; 

describe("Sidebar", () => {
  const MockComponent = () => <div>Mock Component</div>;
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: MemoryRouter });
  };

  it("renders the sidebar and selects the current page", () => {
    renderWithRouter(<Sidebar currentPage="Feed" />, { route: "/feed" });
    // eslint-disable-next-line testing-library/no-node-access
    const selectedItem = screen.getByText("Feed").closest('div');
    expect(selectedItem).toHaveClass("selectedMenuItem"); 
  });

  it("navigates to the correct page when a menu item is clicked", () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<Sidebar currentPage="Feed" />} />
        <Route path="/profile" element={<MockComponent />} />
      </Routes>,
      { route: "/" }
    );

    fireEvent.click(screen.getByText("Profile"));
    expect(screen.getByText("Mock Component")).toBeInTheDocument();
  });


});
