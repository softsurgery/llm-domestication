import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export async function seedNodeTypes() {
  const payload = await getPayload({ config: payloadConfig })

  console.log('🌱 Starting Node Types seed...')

  const existing = await payload.find({ collection: 'node-types', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('✅ Node Types already exist, skipping seed')
    return
  }

  const nodeTypesData = [
    {
      name: 'MySQL Query',
      description:
        'A MySQL query is simply a command written in SQL (Structured Query Language) that you send to a MySQL database to ask it to do something — like get, insert, update, or delete data.',
      icon: null,
    },
    {
      name: 'PostgreSQL Query',
      description:
        'A PostgreSQL query is simply a command written in SQL (Structured Query Language) that you send to a PostgreSQL database to ask it to do something — like get, insert, update, or delete data.',
      icon: null,
    },
    {
      name: 'HTTP Request',
      description:
        'An HTTP request is a message sent from a client to a server using the Hypertext Transfer Protocol (HTTP). It is a request for a specific resource on a server, such as a web page or an API endpoint.',
      icon: null,
    },
  ]

  for (const type of nodeTypesData) {
    await payload.create({
      collection: 'node-types',
      data: type,
    })
  }

  console.log('✅ node-types seeded successfully.')
}
