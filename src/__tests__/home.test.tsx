import { render, screen } from "@testing-library/react";
import HomePage from "../pages";
import { NextIntlClientProvider } from "next-intl";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "@app/utils/services/TestUtils";
import { SessionProvider } from "next-auth/react";

const messages = {
  Home: {
    welcome: "Welcome, login now!",
    description:
      "Manage the income and expenses of your company. From here you can record the movements that your company makes from managing the users or employees who will use the development.",
    btnLogin: "Login now!",
  },
};

describe("HomePage", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <SessionProvider session={null}>
          <NextIntlClientProvider locale="en" messages={messages}>
            <HomePage />
          </NextIntlClientProvider>
        </SessionProvider>
      </RouterContext.Provider>,
    );
  })
  it("should render", () => {
    const titleCard = screen.getByText(messages.Home.welcome);
    const descriptionCard = screen.getByText(messages.Home.description)
    const btnLink =  screen.getByText(messages.Home.btnLogin)
    expect(titleCard).toBeInTheDocument()
    expect(descriptionCard).toBeInTheDocument()
    expect(btnLink).toBeInTheDocument()
  });
});
