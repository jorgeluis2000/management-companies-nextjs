import { MockedProvider } from "@apollo/client/testing";
import TransactionPage from "@app/pages/dashboard/transaction";
import {
  COUNT_TRANSACTIONS,
  CURRENT_BALANCE_TRANSACTION,
  GET_TRANSACTIONS,
} from "@app/utils/queries/TransactionQuery";
import { createMockRouter } from "@app/utils/services/TestUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

const pathPage = "/dashboard/transaction";

const mocks = [
  {
    request: {
      query: GET_TRANSACTIONS,
      variables: { page: 1, limit: 25 },
    },
    result: {
      data: {
        transactions: [
          {
            id: 1,
            user: { name: "User1", email: "user1@example.com", role: "Admin" },
            concept: "Test Transaction 1",
            typeTransaction: "INCOME",
            createdAt: "2023-01-01T12:00:00Z",
            amount: 100,
          },
          {
            id: 2,
            user: { name: "User2", email: "user2@example.com", role: "User" },
            concept: "Test Transaction 2",
            typeTransaction: "EXPENSE",
            createdAt: "2023-01-02T12:00:00Z",
            amount: 50,
          },
          // Agrega más datos según sea necesario para tus pruebas
        ],
      },
    },
  },
  {
    request: {
      query: COUNT_TRANSACTIONS,
    },
    result: {
      data: {
        countTransactions: 50,
      },
    },
  },
  {
    request: {
      query: CURRENT_BALANCE_TRANSACTION,
    },
    result: {
      data: {
        currentBalance: 1000,
      },
    },
  },
];

const messages = {
  Transaction: {
    cardBalance: {
      title: "Total Balance",
      extra: "all times",
    },
    cardCountTransactions: {
      title: "Total Transactions",
      extra: "all times",
    },
    tableTransactions: {
      title: "Transactions",
      summary: "Recent transactions from your company.",
      more: "View All",
      showMore: "Show more",
      add: "Add",
      columns: {
        user: "User",
        typeUser: "Type User",
        typeTransaction: "Type Transaction",
        concept: "Concept",
        date: "Date",
        amount: "Amount",
      },
    },
    sheetAddTransaction: {
      title: "Add a transaction",
      description:
        "In this section you can add balance entry and exit transactions.",
      btnSaveName: "Make transaction",
      inputs: {
        labelConcept: "Concept",
        placeholderConcept: "Car payment...",
        labelAmount: "Amount",
        placeholderAmount: "Payment amount",
        labelType: "Type",
        placeholderType: "Select transfer type",
        optionsType: {
          defaultValue: "Transfer type",
          income: "Income",
          expense: "Expense",
        },
      },
    },
    toasts: {
      add: {
        title: "Success",
        message: "Successfully enhanced transition",
      },
    },
  },
  Navigation: {
    home: "Home",
    transactions: "Transactions",
    reports: "Reports",
    communities: "Communities",
    profile: "Account Settings",
    logout: "Log Out",
  },
};

jest.mock("usehooks-ts", () => ({
  useReadLocalStorage: jest
    .fn()
    .mockReturnValue(["America/Bogota", jest.fn(), jest.fn()]),
  useLocalStorage: jest
    .fn()
    .mockImplementation((key: string, defaultValue: string) => {
      // Implementa el comportamiento de mock según sea necesario para tus pruebas
      return ["America/Bogota", jest.fn(), jest.fn()]; // Simula el retorno esperado
    }),
  useMediaQuery: jest.fn().mockReturnValue(true),
}));

describe("TransactionPage", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          asPath: pathPage,
          pathname: pathPage,
          locale: "en",
        })}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <SessionProvider session={null}>
            <NextIntlClientProvider locale="en" messages={messages}>
              <TransactionPage />
            </NextIntlClientProvider>
          </SessionProvider>
        </MockedProvider>
      </RouterContext.Provider>,
    );
  });

  it("should render transaction information cards", async () => {
    
    expect(screen.getByText(messages.Transaction.cardBalance.title)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.cardBalance.extra)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.cardCountTransactions.title)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.cardCountTransactions.extra)).toBeInTheDocument();
  });
  
  it("should render transaction information table", async() => {

    waitFor(() => {
      expect(messages.Transaction.tableTransactions.add).toBeInTheDocument();

      expect(screen.getByText(messages.Transaction.tableTransactions.columns.amount)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.columns.concept)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.columns.date)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.columns.typeTransaction)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.columns.typeUser)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.columns.user)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.more)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.showMore)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.summary)).toBeInTheDocument();
      expect(screen.getByText(messages.Transaction.tableTransactions.title)).toBeInTheDocument();
    })
    
  })

  it("should render sheetAddTransaction", async () => {
    const btnAction = screen.getByRole('button', { name: messages.Transaction.tableTransactions.add })

    expect(btnAction).toBeInTheDocument();

    fireEvent.click(btnAction)

    expect(screen.getByText(messages.Transaction.sheetAddTransaction.title)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.sheetAddTransaction.description)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.sheetAddTransaction.description)).toBeInTheDocument();
    expect(screen.getByText(messages.Transaction.sheetAddTransaction.btnSaveName)).toBeInTheDocument();
  });

  
  it('should render created a transaction', () => {
    const btnAction = screen.getByRole('button', { name: messages.Transaction.tableTransactions.add })

    expect(btnAction).toBeInTheDocument();

    fireEvent.click(btnAction)

    const inputConcept: HTMLInputElement = screen.getByTestId("concept-transaction-add")
    const inputAmount: HTMLInputElement = screen.getByTestId("amount-transaction-add")
    const inputSelectType: HTMLSelectElement = screen.getByTestId("type-transaction-add")
    const btnSubmit = screen.getByRole('button', { name: messages.Transaction.sheetAddTransaction.btnSaveName});

    expect(inputConcept).toBeInTheDocument();
    expect(inputAmount).toBeInTheDocument();
    expect(inputSelectType).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    
    fireEvent.change(inputConcept, { target: { value: "Payment hotdog" } } )
    fireEvent.change(inputAmount, { target: { value: 1000 } } )
    fireEvent.select(inputSelectType, { target: { value: "EXPENSE" } } )
    
    expect(inputConcept.value).toBe("Payment hotdog")
    expect(inputAmount.value).toBe("1000")
    expect(inputSelectType.value).toBe("EXPENSE")

  })
});
