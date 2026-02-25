import query, {CircuitStructure, GateStructure} from "./quantum_caller"

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

export default function Home() {
    return (
        <html>
        <body>
        <header>
        </header>
        </body>
        </html>
    );
}