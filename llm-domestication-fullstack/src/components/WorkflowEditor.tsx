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
import Button from './ui/button'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

export default function WorkflowEditor({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  // Add node dynamically
  const addNode = useCallback(() => {
    const id = `node_${nodes.length + 1}`
    const newNode: Node = {
      id,
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
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
    <div className="flex flex-col flex-1 h-full">
      <div className="flex gap-2 py-2">
        <Button onClick={addNode}>Add Node</Button>
        <Button onClick={saveWorkflow}>Save Workflow</Button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
