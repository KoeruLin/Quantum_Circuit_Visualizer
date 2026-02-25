export interface GateStructure {
    qubits: number[];
    gate: string;
    theta?: number;
    phi?: number;
    lamda?: number;
}

export interface CircuitStructure {
    circuit: GateStructure[];
}

export default async function quantumCaller(gates: CircuitStructure): Promise<any> {
    const response = await fetch("http://127.0.0.1:8000/calculations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gates),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export async function query(input: CircuitStructure): Promise<any> {
    try {
        const result = await quantumCaller(input);
        return JSON.stringify(result, null, 2);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const JSON_OBJECT: GateStructure = {
    qubits: [0],
    gate: "H",
    theta: 0.0,
    phi: 0.0,
    lamda: 0.0
}
const JSON_OBJECT2: GateStructure = {
    qubits: [0],
    gate: "Z",
    theta: 0.0,
    phi: 0.0,
    lamda: 0.0
}

const JSON_LIST: CircuitStructure = {
    circuit: [JSON_OBJECT, JSON_OBJECT2]
}

query(JSON_LIST).then(result => {
    console.log(result);
})