'use client'

import React, { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Connection,
  NodeChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import axios from 'axios'
import { observer } from 'mobx-react-lite'
import workflowModel from '@/models/workflow.model'
import Button from '../ui/button'
import Node from './Node'
import Edge from './Edge'
import Details from './Details'

import { useBreadcrumb } from '@/contexts/BreadcrumbContext'
import { useIntro } from '@/contexts/IntroContext'
import { Node as DomainNode, Edge as DomainEdge } from '@/payload-types'

const nodeTypes = {
  custom: Node,
}

const edgeTypes = {
  custom: Edge,
}

const WorkflowEditor = observer(({ workflowId }: { workflowId: string }) => {
  const { setIntro, clearIntro, setFloating, clearFloating } = useIntro()
  const { setRoutes, clearRoutes } = useBreadcrumb()

  // Initialize page context (breadcrumbs, intro, floating toolbar)
  useEffect(() => {
    setIntro?.(
      'New Workflow',
      'Define a new workflow by adding nodes and edges, and define relationships between nodes.',
    )
    setFloating?.(
      <div className="flex gap-2 py-2">
        <Button onClick={addNode}>Add Custom Node</Button>
        <Button onClick={saveWorkflow}>Save Workflow</Button>
      </div>,
    )
    setRoutes?.([
      { title: 'Home', href: '/' },
      { title: 'Workflows', href: '/workflows' },
      { title: 'Executions', href: '/executions' },
    ])

    return () => {
      clearIntro?.()
      clearFloating?.()
      clearRoutes?.()
    }
  }, [])

  const { nodes, edges, setNodes, setEdges } = workflowModel

  /**
   * Add a new node to the workflow.
   */
  const addNode = useCallback(() => {
    const id = Date.now().toString()
    const newNode: DomainNode = {
      id,
      name: `Node ${id}`,
      workflow: Number(workflowId),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    workflowModel.setNodes([...workflowModel.nodes, newNode])
  }, [workflowId])

  /**
   * Handle new edge connection
   */
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: DomainEdge = {
        id: Date.now(),
        workflow: Number(workflowId),
        sourceNode: params.source,
        targetNode: params.target,
        condition: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      workflowModel.setEdges([...workflowModel.edges, newEdge])
    },
    [workflowId],
  )

  /**
   * Persist workflow changes
   */
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

  /**
   * Handle node position/changes
   */
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        workflowModel.updateNodePosition(change.id, change.position.x, change.position.y)
      }
    })
  }, [])

  return (
    <div className="flex flex-row flex-1 h-full gap-2 py-5">
      <div className="flex flex-col flex-[3]">
        <ReactFlowProvider>
          <ReactFlow
            defaultEdgeOptions={{ type: 'step' }}
            nodes={workflowModel.xNodes}
            edges={workflowModel.xEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onNodeDoubleClick={(_, node) => workflowModel.deleteNode(node.id)}
            onConnect={onConnect}
            d
            onPaneClick={() => workflowModel.setSelectedNode(null)}
            onNodeDragStart={(_, node) =>
              workflowModel.setSelectedNode(
                workflowModel.nodes.find((n) => n.id === node.id) ?? null,
              )
            }
            onEdgeClick={(_, edge) => workflowModel.setSelectedEdge(edge)}
            onEdgeDoubleClick={(_, edge) => workflowModel.deleteEdge(edge.id)}
            fitView
            className="border py-2 rounded-lg"
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      <Details />
    </div>
  )
})

export default WorkflowEditor
