import React, {useCallback, useRef, RefObject, useState} from 'react'

export function svgCoordinateConversion(e: React.MouseEvent<SVGRectElement | SVGSVGElement> | React.PointerEvent<SVGSVGElement | SVGRectElement>): {x: number, y: number} | undefined {
        const svg: SVGSVGElement | null = e.currentTarget.ownerSVGElement;
        if (!svg) return {x: 0, y: 0}
        const svgPoint: DOMPoint = svg.createSVGPoint();
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        const conversion: DOMPoint = svgPoint.matrixTransform(svg.getScreenCTM()?.inverse())
        return {x: conversion.x, y: conversion.y}
    }

export default function usePointerMovement(x: number, y: number) {
                const [position, setPosition] = useState({x: x, y: y});
                const dragging: RefObject<boolean> = useRef(false);
                const offset: RefObject<{x: number, y: number}> = useRef({x: 0, y: 0});

                const movePointerDown = useCallback(
                    (e: React.PointerEvent<SVGRectElement>): void => {
                        dragging.current = true;
                        const svgCoordinates = svgCoordinateConversion(e) ?? {x: 0, y: 0} ;
                        offset.current = {x: svgCoordinates.x - position.x, y: svgCoordinates.y - position.y};
                        e.currentTarget.setPointerCapture(e.pointerId);
                    }, [position])

                const movePointerUp = useCallback(
                    (e: React.PointerEvent<SVGRectElement>): void => {
                        dragging.current = false;
                        e.currentTarget.releasePointerCapture(e.pointerId);
                    }, [])

                const movePointer = useCallback(
                    (e: React.PointerEvent<SVGRectElement>): void => {
                        if (!dragging.current) {
                            return;
                        }
                        const svgCoordinates = svgCoordinateConversion(e) ?? {x: 0, y: 0};
                        setPosition({x: svgCoordinates.x - offset.current.x, y: svgCoordinates.y - offset.current.y});
        }, [])

    return {
        position: position,
        movePointer: movePointer,
        movePointerDown: movePointerDown,
        movePointerUp: movePointerUp
    }
}