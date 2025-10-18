import { seedNodeTypes } from '@/collections/seeders/node-types.seeder'

export const GET = async (_request: Request) => {
  await seedNodeTypes()
  return Response.json({ message: 'Node Types seeded successfully.' })
}
