'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Connection,
  NodeChange,
  EdgeChange,
} from 'react-flow-renderer'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import workflowModel from '@/models/workflow.model'
import Button from '../ui/button'
import CustomNode from './Node'
import { useBreadcrumb } from '@/contexts/BreadcrumbContext'
import { useIntro } from '@/contexts/IntroContext'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import { Node as DomainNode, Edge as DomainEdge } from '@/payload-types'

const nodeTypes = {
  custom: CustomNode,
}

const WorkflowEditor = observer(({ workflowId }: { workflowId: string }) => {
  const { setIntro, clearIntro } = useIntro()
  const { setRoutes, clearRoutes } = useBreadcrumb()
  React.useEffect(() => {
    setIntro?.(
      'New Workflow',
      'Define a new workflow by adding nodes and edges, define relationships between nodes',
    )
    setRoutes?.([
      { title: 'Home', href: '/' },
      { title: 'Workflows', href: '/workflows' },
      { title: 'Executions', href: '/executions' },
    ])
    return () => {
      clearIntro?.()
      clearRoutes?.()
    }
  }, [])
  const { nodes, edges, setNodes, setEdges } = workflowModel

  const addNode = useCallback(() => {
    const id = Date.now() // temporary
    const newNode: DomainNode = {
      id,
      name: `Node ${id}`,
      type: 'action',
      workflow: Number(workflowId),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    workflowModel.setNodes([...workflowModel.nodes, newNode])
  }, [workflowId])

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: DomainEdge = {
        id: Date.now(),
        workflow: Number(workflowId),
        sourceNode: Number(params.source),
        targetNode: Number(params.target),
        condition: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      workflowModel.setEdges([...workflowModel.edges, newEdge])
    },
    [workflowId],
  )

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

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        workflowModel.updateNodePosition(change.id, change.position.x, change.position.y)
      }
    })
  }, [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    changes.forEach((change) => {
      switch (change.type) {
        case 'remove':
          workflowModel.deleteEdge(change.id)
          break

        case 'select':
          // Optional — handle UI edge selection if you need it
          break

        case 'replace':
          if ('edge' in change) {
            const newEdge = change.edge
            workflowModel.updateEdge(change.id, {
              sourceNode: Number(newEdge.source),
              targetNode: Number(newEdge.target),
            })
          }
          break
      }
    })
  }, [])

  return (
    <div className="flex flex-row flex-1 h-full gap-2 py-5">
      <div className="flex flex-col flex-[3]">
        <div className="flex gap-2 py-2">
          <Button onClick={addNode}>Add Custom Node</Button>
          <Button onClick={saveWorkflow}>Save Workflow</Button>
        </div>

        <ReactFlowProvider>
          <ReactFlow
            nodes={workflowModel.xNodes}
            edges={workflowModel.xEdges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneClick={() => workflowModel.setSelectedNode(null)}
            onNodeDragStart={(event, node) => {
              workflowModel.setSelectedNode(node)
            }}
            fitView
            className="border py-2 rounded-lg"
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="flex-1 rounded-lg border p-5">
        {workflowModel.selectedNode ? (
          <div>
            <h2 className="font-semibold text-lg mb-2">{workflowModel.selectedNode.id}</h2>
            <p>{workflowModel?.selectedNode?.position?.x}</p>
            <p>{workflowModel?.selectedNode?.position?.y}</p>
            <Input placeholder="Hello" />
            <Textarea className="resize-none" rows={10} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No node selected</p>
        )}
      </div>
    </div>
  )
})

export default WorkflowEditor
