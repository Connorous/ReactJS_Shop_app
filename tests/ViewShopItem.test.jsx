import ViewShopItem from "../src/components/ViewShopItem";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { vi } from "vitest";
import { act } from "react";
import userEvent from "@testing-library/user-event";

var addItemToCart = null;

describe("View Shop Item component", () => {
  it("Check content matches provided item", () => {
    const item = {
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      category: "men's clothing",
      price: 109.95,
      rating: { rate: 3.9, count: 120 },
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    };
    addItemToCart = vi.fn();
    render(<ViewShopItem item={item} addItemToCart={addItemToCart} />);

    const title = screen.getByRole("heading", { name: "title" });
    expect(title.textContent).toMatch(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );

    const image = screen.getByRole("img");

    const price = screen.getByRole("heading", { name: "price" });
    expect(price.textContent).toMatch("109.95");

    const description = screen.getByRole("paragraph", { name: "description" });
    expect(description.textContent).toMatch(
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    );

    const rating = screen.getByRole("heading", { name: "rating" });
    expect(rating.textContent).toMatch("Rated 3.9 stars from 120 reviews");
  });

  it("Check content matches provided item", async () => {
    const item = {
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      category: "men's clothing",
      price: 109.95,
      rating: { rate: 3.9, count: 120 },
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    };

    const user = userEvent.setup();
    //render(<ViewShopItem item={item} addItemToCart={addItemToCart} />);

    const button = screen.getByRole("button", { name: "addBtn" });
    expect(addItemToCart).not.toHaveBeenCalled();
    act(async () => {
      await user.click(button);
    });

    await waitFor(() => {
      expect(addItemToCart).toHaveBeenCalledTimes(1);
    });
  });
});
