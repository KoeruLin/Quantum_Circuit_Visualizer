'use client'
import React, {useState} from 'react'
import "tailwindcss";

export default function XGate(props: {xPosition: number, yPosition: number}) {
    const [position, setPosition] = useState({x: props.xPosition, y: props.yPosition})
    const [offset, setOffset] = useState({x: 0, y: 0})
    const [dragging, setDragging] = useState(false)

    function handlePointerDown(e: React.PointerEvent<SVGRectElement>): void {
        setDragging(true)
        setOffset({x: e.clientX - position.x, y: e.clientY - position.y,})
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function handlePointerUp(e: React.PointerEvent<SVGRectElement>): void {
        setDragging(false)
        e.currentTarget.releasePointerCapture(e.pointerId);
    }

    function handlePointerMove(e: React.PointerEvent<SVGRectElement>): void {
        if (!dragging) {
            return
        }

        setPosition({x: e.clientX - offset.x, y: e.clientY - offset.y,})
    }

    return (
        <rect
            x={position.x}
            y={position.y}
            width="100"
            height="100"
            fill="blue"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}>
        </rect>
    )
}