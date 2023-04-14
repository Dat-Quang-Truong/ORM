import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.use(express.json());

app.get('/customers', async (req, res) => {
  const customer = await prisma.customers.findMany({
    include: {
      orders: true
    },
    where: {
      customerNumber: 114
    }
  })
  res.json(customer);
})


async function main() {
  const allcustomers = await prisma.customers.findMany({
    include: {
        orders: true
    }
    
  });
  console.log(allcustomers);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })