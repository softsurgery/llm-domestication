import { CollectionConfig } from 'payload'

export const NodeTypes: CollectionConfig = {
  slug: 'node-types',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
  ],
}
