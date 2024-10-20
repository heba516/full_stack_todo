import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker"
  
const prisma = new PrismaClient()

async function main() {

  await prisma.todo.createMany({
      data: Array.from({ length : 20 }, () => (
          {
          title: faker.lorem.words({max: 4, min: 2}),
          body: faker.lorem.paragraph({max: 10, min: 3})
      }
        ))
  })

  //   await prisma.user.createMany({
  //     data: Array.from({ length : 20 }, () => (
  //         {
  //         email: faker.internet.email(),
  //         name: faker.internet.userName(),
  //         address: {
  //           street: faker.location.street(),
  //           city: faker.location.city(),
  //           state: faker.location.state(),
  //           zip: faker.location.zipCode(),
  //         }
  //     }
  //       ))
  // })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })