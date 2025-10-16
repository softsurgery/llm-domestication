import { CollectionConfig } from 'payload'

export const Edges: CollectionConfig = {
  slug: 'edges',
  fields: [
    {
      name: 'workflow',
      type: 'relationship',
      relationTo: 'workflows',
      required: true,
    },
    {
      name: 'sourceNode',
      type: 'relationship',
      relationTo: 'nodes',
      required: true,
    },
    {
      name: 'targetNode',
      type: 'relationship',
      relationTo: 'nodes',
      required: true,
    },
    {
      name: 'condition',
      type: 'json',
      required: false,
    },
  ],
  timestamps: true,
}
