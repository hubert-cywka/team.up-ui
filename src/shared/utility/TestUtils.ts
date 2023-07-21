import { NextRouter } from 'next/router';

export const createMockRouter = (router: NextRouter): NextRouter => {
  return {
    ...router,
    push: jest.fn()
  };
};
