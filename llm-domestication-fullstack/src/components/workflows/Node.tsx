'use client'

import React from 'react'
import { Handle, Position } from 'react-flow-renderer'
import Button from '../ui/button'
import { useNodeTypes } from '@/hooks/useNodeTypes'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Card, CardContent, CardCover, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Media } from '@/payload-types'
import { observer } from 'mobx-react-lite'

export const CustomNode = observer(({ id, data }) => {
  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    data.onClick?.()
  }
  const { data: nodeTypes, isPending } = useNodeTypes({})
  return (
    <div className="bg-background border rounded-xl shadow p-3 w-48 text-center cursor-move">
      <div className="font-semibold mb-1">{data.label || 'Custom Node'}</div>
      {data.description && <div className="text-xs mb-2">{data.description}</div>}
      <Dialog>
        <DialogTrigger>
          <Button>Select Node Type</Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] min-h-[50vh]">
          <DialogHeader
            className="sticky top-0 z-10"
            title="Select a node type"
            description="define the node type you want to use"
          />
          {nodeTypes?.length != 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-center items-center py-2">
              {nodeTypes?.map((type) => (
                <Card key={type.id} className="w-full">
                  <CardCover
                    src={(type.icon as Media)?.url || ''}
                    alt={(type.icon as Media)?.alt || ''}
                  />
                  <CardHeader>
                    <CardTitle>{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{type.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button>Use</Button>
                    <Button variant="secondary">Configure</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No node types found.</p>
          )}
        </DialogContent>
      </Dialog>

      <Button onClick={handleButtonClick}>Click</Button>

      {/* Handles for connecting nodes */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
})

export default CustomNode
