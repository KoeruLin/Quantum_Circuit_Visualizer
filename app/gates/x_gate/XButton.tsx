'use client'
import XGate from "@/app/gates/x_gate/X";
import React, { useState } from 'react'
import {svgCoordinateConversion} from "@/app/gates/gate_movement";

interface gate {
    id: number;
    x: number;
    y: number;
}

export default function XButton() {
    const [gates, setGates] = useState<gate[]>([]);

    function handleSVGClick(e: React.MouseEvent<SVGSVGElement>): void {
        const coordinate =
            svgCoordinateConversion(e) ?? {x: 0, y: 0};
        setGates(prev => [...prev, {id: prev.length, x: coordinate.x, y: coordinate.y}]);
    }

    return (
        <>
            <svg width="100vw" height="100vh" className="border">
                <rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    fill="purple"
                    style={{ cursor: 'pointer' }}
                    onClick={handleSVGClick}
                />
                {gates.map((gate) => (
                    <XGate key={gate.id} xPosition={gate.x} yPosition={gate.y} />
                ))}
            </svg>
        </>
    )
}