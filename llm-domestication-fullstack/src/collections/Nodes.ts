import { CollectionConfig } from 'payload'

export const Nodes: CollectionConfig = {
  slug: 'nodes',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'workflow',
      type: 'relationship',
      relationTo: 'workflows',
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
        { label: 'Trigger', value: 'trigger' },
        { label: 'Action', value: 'action' },
        { label: 'Function', value: 'function' },
        { label: 'HTTP Request', value: 'http' },
        { label: 'Email', value: 'email' },
      ],
    },
    {
      name: 'position',
      type: 'group',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
      ],
    },
    {
      name: 'config',
      type: 'json',
    },
    {
      name: 'credentials',
      type: 'relationship',
      relationTo: 'credentials',
      required: false,
    },
  ],
  timestamps: true,
}
