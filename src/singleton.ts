import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import createPrismaMock from 'prisma-mock';

import prisma from './client';

jest.mock('prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
    ...jest.requireActual("prisma"),
}));

beforeEach(() => {
    mockReset(prismaMock);
    // createPrismaMock({}, prisma._baseDmmf.datamodel);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;