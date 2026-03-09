'use client'
import XGate from "@/app/gates/x_gate/X";
import React, { useState, useCallback } from 'react'
import {svgCoordinateConversion, gate} from "@/app/gates/utilities";

export default function XButton(props: {visibility: boolean}) {
    const [gates, setGates] = useState<gate[]>([]);

    const handleSVGClick = useCallback((e: React.MouseEvent<SVGRectElement>): void => {
        const coordinate = svgCoordinateConversion(e) ?? {x: 0, y: 0};
        setGates(prev => [...prev, {id: prev.length, x: coordinate.x, y: coordinate.y}]);
    }, [])

    return (
        <div className={props.visibility ? "block" : "hidden"} style={{position: 'relative'}}>
            <svg width={100} height={100} style={{ overflow: 'visible' }}>
                <rect
                    width={100}
                    height={100}
                    fill="cyan"
                    onClick={handleSVGClick}
                />
                {gates.map(gate => (
                    <XGate key={gate.id} xPosition={gate.x} yPosition={gate.y} />
                ))}
            </svg>
        </div>
    )
}