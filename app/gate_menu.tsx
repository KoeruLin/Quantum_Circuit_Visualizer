'use client'
import {useState} from 'react';
import XButton from "@/app/gates/x_gate/XButton";
import HButton from "@/app/gates/h_gate/HButton";
import 'tailwindcss'

export default function GateMenu() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <svg>
                <rect width={100}
                      height={100}
                      fill={open ? "black" : "grey"}
                      onClick={() => setOpen(!open)}>
                </rect>
            </svg>

            <div>
                <XButton visibility={open} />
                <HButton visibility={open} />
            </div>
        </div>
    )
}

// current error: tailwindcss hidden and block does not work at all to hide elements