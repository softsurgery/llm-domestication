'use client'

import React from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { observer } from 'mobx-react-lite'

import Button from '../ui/button'
import { useNodeTypes } from '@/hooks/useNodeTypes'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Card, CardContent, CardCover, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Media } from '@/payload-types'

type CustomNodeData = {
  id: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export const CustomNode = observer(({}: NodeProps<CustomNodeData>) => {
  const { data: nodeTypes, isPending } = useNodeTypes({})

  return (
    <div className="bg-background border rounded-xl shadow p-3 w-48 h-48 text-center cursor-move">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="border-dashed">
            +
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] min-h-[50vh]">
          <DialogHeader
            className="sticky top-0 z-10"
            title="Select a node type"
            description="Define the node type you want to use"
          />

          {isPending ? (
            <p>Loading node types...</p>
          ) : nodeTypes?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-center items-center py-2">
              {nodeTypes.map((type) => (
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

      {/* Connection handles for React Flow */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
})

export default CustomNode
