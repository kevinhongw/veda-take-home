import { healthCheck } from './health-check';

jest.mock('../database', () => {
  return {
    knex: {
      table: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue([{ id: 1 }]),
    },
  };
});

describe('Test /health', () => {
  it('health should be okay', async () => {
    const request = {} as any;
    const response = { json: jest.fn() } as any;

    await healthCheck(request, response);
    expect(response.json).toHaveBeenCalledWith({ id: 1 });
  });
});
