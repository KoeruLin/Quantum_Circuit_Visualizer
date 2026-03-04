'use client'
import React from 'react'
import "tailwindcss";
import usePointerMovement from "@/app/gates/gate_movement"

export default function XGate(props: {xPosition: number, yPosition: number}) {
    const movement = usePointerMovement(props.xPosition, props.yPosition)
    return (
        <rect
            style={{cursor: 'grab'}}
            x={movement.position.x}
            y={movement.position.y}
            width="100"
            height="100"
            fill="blue"
            onPointerDown={movement.movePointerDown}
            onPointerUp={movement.movePointerUp}
            onPointerMove={movement.movePointer}>
        </rect>
    )
}