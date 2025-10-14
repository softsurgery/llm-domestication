import React from 'react'
import './styles.css'
import Layout from '@/components/layout/Layout'

export const metadata = {
  description: 'Domestication',
  title: 'Domestication',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
