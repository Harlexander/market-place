import { PrismaClient } from '@prisma/client'

const prisma = global.prisma ?? new PrismaClient();

module.exports = prisma;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma