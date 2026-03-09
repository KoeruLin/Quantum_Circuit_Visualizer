import React, {useCallback, useRef, useState} from 'react'

export interface gate {
    id: number,
    x: number;
    y: number;
}

export function svgCoordinateConversion(e: React.MouseEvent<SVGRectElement | SVGSVGElement> | React.PointerEvent<SVGSVGElement | SVGRectElement>): {x: number, y: number} | undefined {
        const svg = e.currentTarget.ownerSVGElement;
        if (!svg) return {x: 0, y: 0}
        const svgPoint: DOMPoint = svg.createSVGPoint();
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        const conversion: DOMPoint = svgPoint.matrixTransform(svg.getScreenCTM()?.inverse())
        return {x: conversion.x, y: conversion.y}
    }

export default function usePointerMovement(x: number, y: number) {
                const [position, setPosition] = useState({x: x, y: y});
                const currentPosition = useRef({x: x, y: y})
                const dragging = useRef(false);
                const offset= useRef({x: 0, y: 0});

                const movePointerDown = useCallback(
                    (event: React.PointerEvent<SVGRectElement>): void => {
                        dragging.current = true;
                        const svgCoordinates = svgCoordinateConversion(event) ?? {x: 0, y: 0};
                        offset.current = {x: svgCoordinates.x - currentPosition.current.x,
                            y: svgCoordinates.y - currentPosition.current.y};
                        event.currentTarget.setPointerCapture(event.pointerId);
                    }, [])

                const movePointerUp = useCallback(
                    (event: React.PointerEvent<SVGRectElement>): void => {
                        dragging.current = false;
                        event.currentTarget.releasePointerCapture(event.pointerId);
                    }, [])

                const movePointer = useCallback(
                    (event: React.PointerEvent<SVGRectElement>): void => {
                        console.log(dragging.current);
                        if (!dragging.current) {
                            return;
                        }
                        const svgCoordinates = svgCoordinateConversion(event) ?? {x: 0, y: 0};
                        const newPosition = {x: svgCoordinates.x - offset.current.x, y: svgCoordinates.y - offset.current.y}
                        currentPosition.current = newPosition;
                        setPosition(newPosition);
                    }, [])

    return {
        position: position,
        movePointer: movePointer,
        movePointerDown: movePointerDown,
        movePointerUp: movePointerUp
    }
}