'use client'

import { makePersistable } from 'mobx-persist-store'
import { action, computed, makeObservable, observable } from 'mobx'
import type { Node as DomainNode, Edge as DomainEdge } from '@/payload-types'
import type { Node, Edge } from '@xyflow/react'

class WorkflowModel {
  nodes: DomainNode[] = []
  edges: DomainEdge[] = []
  selectedNode: DomainNode | null = null

  constructor() {
    makeObservable(this, {
      //observables
      nodes: observable,
      edges: observable,
      selectedNode: observable,
      //computed
      xNodes: computed,
      xEdges: computed,
      //action
      addNode: action,
      addEdge: action,
      updateNode: action,
      deleteNode: action,
      setNodes: action,
      setEdges: action,
      updateEdge: action,
      deleteEdge: action,
      setSelectedNode: action,
    })

    makePersistable(this, {
      name: 'WorkflowStore',
      properties: ['nodes', 'xNodes', 'edges', 'xEdges'],
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    })
  }

  get xNodes(): Node[] {
    return this.nodes.map((n) => ({
      id: String(n.id),
      type: 'custom',
      position: {
        x: n.position?.x ?? 0,
        y: n.position?.y ?? 0,
      },
      data: {
        label: n.name,
        description: n.type,
      },
    }))
  }

  get xEdges(): Edge[] {
    return this.edges.map((e) => ({
      id: String(e.id),
      source: String(typeof e.sourceNode === 'object' ? e.sourceNode.id : e.sourceNode),
      target: String(typeof e.targetNode === 'object' ? e.targetNode.id : e.targetNode),
      data: { condition: e.condition },
    }))
  }

  addNode(node: DomainNode) {
    this.nodes.push(node)
  }

  addEdge(edge: DomainEdge) {
    this.edges.push(edge)
  }

  updateNode(id: string, updatedData: Partial<DomainNode>) {
    const index = this.nodes.findIndex((node) => String(node.id) === id)
    if (index !== -1) {
      this.nodes[index] = { ...this.nodes[index], ...updatedData }
    }
  }

  deleteNode(id: string) {
    this.nodes = this.nodes.filter((node) => String(node.id) !== id)
    this.edges = this.edges.filter(
      (edge) => String(edge.sourceNode) !== id && String(edge.targetNode) !== id,
    )
  }

  deleteEdge(id: string) {
    this.edges = this.edges.filter((edge) => String(edge.id) !== id)
  }

  setNodes = action((nodes: DomainNode[]) => {
    this.nodes = nodes
  })

  setEdges = action((edges: DomainEdge[]) => {
    this.edges = edges
  })

  setSelectedNode = action((node: DomainNode | null) => {
    this.selectedNode = node
  })

  updateNodePosition(id: string, x: number, y: number) {
    const n = this.nodes.find((n) => String(n.id) === id)
    if (n) {
      n.position = { x, y }
    }
  }

  updateNodeData(id: string, partial: Partial<DomainNode>) {
    const n = this.nodes.find((n) => String(n.id) === id)
    if (n) Object.assign(n, partial)
  }

  updateEdge(id: string, partial: Partial<DomainEdge>) {
    const edge = this.edges.find((e) => String(e.id) === id)
    if (edge) Object.assign(edge, partial)
  }

  reset() {
    this.nodes = []
    this.edges = []
    this.selectedNode = null
  }
}

const workflowModel = new WorkflowModel()
export default workflowModel
