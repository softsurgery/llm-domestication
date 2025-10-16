'use client'

import React, { useState, useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
  applyNodeChanges,
} from 'react-flow-renderer'
import axios from 'axios'
import Button from '../ui/button'
import CustomNode from './Node'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

const nodeTypes = {
  custom: CustomNode,
}

export default function WorkflowEditor({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  // Add node dynamically
  const addNode = useCallback(() => {
    const id = `node_${nodes.length + 1}`
    const newNode: Node = {
      id,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `Custom Node ${nodes.length + 1}`,
        description: 'This is a custom node',
        onClick: () => alert(`Clicked node ${id}`),
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes])

  // Handle edge creation
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  // Save workflow nodes and edges to Payload
  const saveWorkflow = useCallback(async () => {
    try {
      await axios.put(`/api/workflows/${workflowId}`, {
        nodes,
        edges,
      })
      alert('Workflow saved!')
    } catch (err) {
      console.error(err)
      alert('Error saving workflow')
    }
  }, [nodes, edges, workflowId])

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }

  return (
    <div className="flex flex-col flex-1 h-full gap-2 p-5">
      <div className="flex gap-2 py-2">
        <Button onClick={addNode}>Add Custom Node</Button>
        <Button onClick={saveWorkflow}>Save Workflow</Button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="border py-2"
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
