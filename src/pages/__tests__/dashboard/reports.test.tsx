import { MockedProvider } from "@apollo/client/testing";
import {
  COUNT_TRANSACTIONS,
  CURRENT_BALANCE_TRANSACTION,
  GET_CHART_DATA_TRANSACTION,
} from "@app/utils/queries/TransactionQuery";
import { render, screen, waitFor } from "@testing-library/react";
import ReportsPage from "../../dashboard/reports";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "@app/utils/services/TestUtils";

const mocks = [
  {
    request: {
      query: CURRENT_BALANCE_TRANSACTION,
    },
    result: {
      data: {
        currentBalanceTransaction: {
          currentBalance: 1000,
        },
      },
    },
  },
  {
    request: {
      query: COUNT_TRANSACTIONS,
      variables: { typeTransaction: "INCOME" },
    },
    result: {
      data: {
        countTransactions: {
          count: 50,
        },
      },
    },
  },
  {
    request: {
      query: GET_CHART_DATA_TRANSACTION,
      variables: {
        limit: 1000,
        page: 1,
        typeTransaction: "INCOME",
        createdAfter: null,
        createdBefore: null,
      },
    },
    result: {
      data: {
        getChartData: [
          {
            amount: 100,
            createdAt: "2023-01-01",
            user: {
              email: "test@example.com",
              name: "Test User",
              role: "USER",
            },
          },
        ],
      },
    },
  },
];

const messages = {
  Report: {
    title: "Reporte de transacciones",
    btnDownload: "Descargar",
    cardBalance: {
      title: "Saldo Total",
      extra: "Desde el principio",
    },
    cardCountTransactions: {
      title: "Transiciones Totales",
      extra: "Desde el principio",
    },
    inputs: {
      labelType: "Tipo",
      placeholderType: "Seleccione el tipo de transferencia",
      optionsType: {
        defaultValue: "Tipo transferencia",
        income: "Ingresos",
        expense: "Gastos",
      },
      labelTime: "Rango de tiempo",
      placeholderTime: "Seleccione el rango",
      optionsTime: {
        defaultValue: "Rango de tiempo",
        last_7_days: "Últimos 7 días",
        last_30_days: "Últimos 30 días",
        all_time: "Desde el principio",
        today: "Hoy",
      },
    },
  },
  "Navigation": {
    "home": "Home",
    "transactions": "Transactions",
    "reports": "Reports",
    "communities": "Communities",
    "profile": "Account Settings",
    "logout": "Log Out"
  }
};

describe("ReportsPage", () => {
  beforeEach(() => {
    if (typeof window !== "undefined") {
      window.matchMedia =
        window.matchMedia ||
        (() => ({
          matches: false,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));
    }
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SessionProvider session={null}>
            <NextIntlClientProvider locale="en" messages={messages}>
              <ReportsPage />
            </NextIntlClientProvider>
          </SessionProvider>
        </MockedProvider>
      </RouterContext.Provider>,
    );
  });
  it("should render", async () => {
    const titleScreen = screen.getByText(messages.Report.title)
    const btnDownload = screen.getByText(messages.Report.btnDownload)
    const titleCardBalance = screen.getByText(messages.Report.cardBalance.title)
    expect(titleScreen).toBeInTheDocument()
    expect(btnDownload).toBeInTheDocument()
    expect(titleCardBalance).toBeInTheDocument()
  });
});
