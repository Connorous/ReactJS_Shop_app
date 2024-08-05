import App from "../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { vi } from "vitest";
import { act } from "react";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("Check App Renders", () => {
    render(<App />);
    screen.debug();
  });
});
