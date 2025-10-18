import { PayloadHiddenComponent } from '@/components/HiddenComponent'
import { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const Nodes: CollectionConfig = {
  slug: 'nodes',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          // generate a UUID
          const customID = uuidv4()
          return { ...data, id: customID }
        }
        return data
      },
    ],
  },

  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        components: {
          Field: PayloadHiddenComponent,
        },
      },
    },
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
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'type',
      type: 'relationship',
      required: false,
      relationTo: 'node-types',
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
