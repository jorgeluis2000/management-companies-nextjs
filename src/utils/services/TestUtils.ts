import type { NextRouter } from "next/router";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  const mockRouter: NextRouter = {
    asPath: "/",
    basePath: "/",
    pathname: "/",
    route: "/",
    back: jest.fn(),
    events: {
      emit: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
    },
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    forward: jest.fn(),
    isFallback: false,
    isPreview: true,
    isReady: true,
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
    reload: jest.fn(),
    isLocaleDomain: true,
    ...router,
  };
  return mockRouter;
}
