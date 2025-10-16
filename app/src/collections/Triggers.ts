import { CollectionConfig } from 'payload'

export const Triggers: CollectionConfig = {
  slug: 'triggers',
  fields: [
    {
      name: 'workflow',
      type: 'relationship',
      relationTo: 'workflows',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Webhook', value: 'webhook' },
        { label: 'Schedule (Cron)', value: 'schedule' },
        { label: 'Event', value: 'event' },
      ],
    },
    {
      name: 'config',
      type: 'json',
    },
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  timestamps: true,
}
