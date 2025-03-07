import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export type PrismaMockType = DeepMockProxy<PrismaClient>;

const prismaMock: PrismaMockType = mockDeep<PrismaClient>();

export default prismaMock;