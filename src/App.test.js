import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Auth0Provider } from "@auth0/auth0-react";
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

  expect(screen.findByText("CLICK AN IMAGE TO VIEW MORE DETAILS"));
});

test('renders the Footer', () => {
  render(<Footer />);
  expect(screen.findByText("small"));

});

afterEach(cleanup);
