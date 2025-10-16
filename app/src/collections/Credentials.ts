import { CollectionConfig } from 'payload'

export const Credentials: CollectionConfig = {
  slug: 'credentials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'HTTP', value: 'http' },
        { label: 'Slack', value: 'slack' },
        { label: 'Gmail', value: 'gmail' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'data',
      type: 'json',
      required: true,
      admin: { description: 'Encrypted credentials JSON' },
    },
  ],
  timestamps: true,
}
