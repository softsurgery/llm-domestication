'use client'

import React from 'react'
import { BaseEdge, EdgeProps, getStraightPath } from '@xyflow/react'
import { observer } from 'mobx-react-lite'

const Edge: React.FC<EdgeProps> = observer(
  ({ id, sourceX, sourceY, targetX, targetY, selected }) => {
    const [edgePath] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    })

    return (
      <BaseEdge
        id={id}
        path={edgePath}
        className="hover:opacity-40"
        style={{
          strokeWidth: selected ? 10 : 5,
          stroke: selected ? '#ff0077' : '#333',
        }}
      />
    )
  },
)

export default Edge
