import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import Footer from "./components/Footer.js"
import Header from "./components/Header.js"
import Projects from "./components/Projects.js"
import App from "./App.js"

test('renders the Header', () => {
  render(<Header />);
  
  expect(screen.findByRole("img"));
});

test('renders Projects', () => {
  render(<Projects />);

  fireEvent.click(screen.getByText('Click an image to view more details'))
});

test('renders the Footer', () => {
  render(<Footer />);
  expect(screen.findByRole("small"));

});

afterEach(cleanup);
