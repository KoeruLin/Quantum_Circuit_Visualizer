from qiskit import *
from qiskit.circuit.library import *
from qiskit.quantum_info import Statevector
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class GateStructure(BaseModel):
    qubits: List[int]
    gate: str
    theta: float = 0.0
    phi: float = 0.0
    lamda: float = 0.0


class CircuitStructure(BaseModel):
    circuit: List[GateStructure]


def get_gate(gate: str, theta: float = 0.0, phi: float = 0.0, lamda: float = 0.0):
    gates = {
        "X": XGate,
        "Y": YGate,
        "Z": ZGate,
        "H": HGate,
        "S": SGate,
        "T": TGate,
        "RX": RXGate,
        "RY": RYGate,
        "RZ": RZGate,
        "U": UGate,
    }

    selected = gates.get(gate)

    if gate in ["RX", "RY", "RZ"]:
        return selected(theta)
    if gate in ["U"]:
        return selected(theta, phi, lamda)
    if selected is None:
        return IGate()
    return selected()

@app.post("/calculations")
def calculations(circuit_input: CircuitStructure):
    circuit = QuantumCircuit(1)

    for gate_input in circuit_input.circuit:
        circuit.append(get_gate(gate_input.gate, gate_input.theta, gate_input.phi, gate_input.lamda),
                       gate_input.qubits)

    vector = Statevector(circuit)
    alpha = vector.data[0]
    beta = vector.data[1]
    x_coordinate = round(float(2 * (alpha * beta.conj()).real), 5)
    y_coordinate = round(float(2 * (alpha * beta.conj()).imag), 5)
    z_coordinate = round(float(np.abs(alpha) ** 2 - np.abs(beta) ** 2), 5)
    print(circuit)
    print(vector)
    print(x_coordinate, y_coordinate, z_coordinate)

    return {
        "x-coordinate": x_coordinate,
        "y-coordinate": y_coordinate,
        "z-coordinate": z_coordinate
    }
