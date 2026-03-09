'use client'
import React from 'react'
import "tailwindcss";
import usePointerMovement from "@/app/gates/utilities"

export default function XGate(props: {xPosition: number, yPosition: number}) {
    const movement = usePointerMovement(props.xPosition, props.yPosition)
    return (
        <rect
            className={"cursor-grab pointer-events-auto absolute top-0 bottom-0 left-0 right-0"}
            x={movement.position.x}
            y={movement.position.y}
            width={100}
            height={100}
            fill={"blue"}
            onPointerDown={movement.movePointerDown}
            onPointerUp={movement.movePointerUp}
            onPointerMove={movement.movePointer}
        >
        </rect>
    )
}