import React from "react";
import { render } from "@testing-library/react";
import App from "./index";
import { BrowserRouter } from "react-router-dom";

test("renders the Hacker News navbar", () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = getByText(/acker News/i);
  expect(title).toBeInTheDocument();
});

test("renders the news table headings", () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const commentsHeading = getByText(/Comments/i);
  const votesHeading = getByText(/Votes Count/i);
  const upvoteHeading = getByText(/Upvote/i);
  const detailsHeading = getByText(/News Details/i);
  expect(commentsHeading).toBeInTheDocument();
  expect(votesHeading).toBeInTheDocument();
  expect(upvoteHeading).toBeInTheDocument();
  expect(detailsHeading).toBeInTheDocument();
});
