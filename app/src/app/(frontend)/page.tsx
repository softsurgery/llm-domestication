import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import WorkflowEditor from '@/components/workflows/WorkflowEditor'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return <WorkflowEditor workflowId="61e0d0f4-c1a1-4d5c-a7a8-d8e1e2d3e4f5" />
}
