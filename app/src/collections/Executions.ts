import { CollectionConfig } from 'payload'

export const Executions: CollectionConfig = {
  slug: 'executions',
  fields: [
    {
      name: 'workflow',
      type: 'relationship',
      relationTo: 'workflows',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'running',
      options: [
        { label: 'Running', value: 'running' },
        { label: 'Success', value: 'success' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'finishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'inputData',
      type: 'json',
    },
    {
      name: 'outputData',
      type: 'json',
    },
    {
      name: 'log',
      type: 'json',
    },
    {
      name: 'errorMessage',
      type: 'textarea',
    },
    {
      name: 'triggeredBy',
      type: 'select',
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Schedule', value: 'schedule' },
        { label: 'Webhook', value: 'webhook' },
      ],
    },
  ],
  timestamps: true,
}
