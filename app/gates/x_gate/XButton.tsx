'use client'
import XGate from "@/app/gates/x_gate/X";
import React, { useState } from 'react'

export default function XButton() {
    const [render, setRender] = useState<number[]>([])
    const [coordinate, setCoordinate] = useState<number[]>([0, 0])

    function handleMouseClick(e: React.MouseEvent<HTMLDivElement>): void {
        setRender(render => [...render, render.length]);
        setCoordinate([e.clientX, e.clientY])
    }

    return (
        <>
            <div onClick={handleMouseClick} className="button">
                Click Here For Button
            </div>
            <svg width="100vw" height="100vh" className="border">
                {render.map((id: number) => (
                    <XGate
                        key={id}
                        xPosition={coordinate[0]}
                        yPosition={coordinate[1]}
                    />
                ))}
            </svg>
        </>
    )
}