import { cleanup, fireEvent, render } from "@testing-library/react";

import Footer from "./components/Footer.js"
import Header from "./components/Header.js"
test('renders the Header', () => {
  render(<Header />);
});

test('renders the Footer', () => {
  render(<Footer />);
});

afterEach(cleanup);
