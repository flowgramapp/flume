export const exampleNodes: {
    '5nCLb85WDw': {
        id: string;
        x: number;
        y: number;
        type: string;
        width: number;
        connections: {
            inputs: {
                num1: never[];
                num2: never[];
            };
            outputs: {};
        };
        inputData: {
            num1: {
                number: number;
            };
            num2: {
                number: number;
            };
        };
    };
    vRPQ06k4nT: {
        id: string;
        x: number;
        y: number;
        type: string;
        width: number;
        connections: {
            inputs: {};
            outputs: {
                number: never[];
            };
        };
        inputData: {
            number: {
                number: number;
            };
        };
    };
    BDhQ98lTfw: {
        id: string;
        x: number;
        y: number;
        type: string;
        width: number;
        connections: {
            inputs: {};
            outputs: {
                number: never[];
            };
        };
        inputData: {
            number: {
                number: number;
            };
        };
    };
};
export namespace portTypes {
    namespace number {
        const label: string;
        const name: string;
        const acceptTypes: string[];
        const color: string;
        const controls: {
            type: string;
            name: string;
            label: string;
            defaultValue: number;
        }[];
    }
}
export namespace nodeTypes {
    export namespace number_1 {
        export const type: string;
        const label_1: string;
        export { label_1 as label };
        export const initialWidth: number;
        export const inputs: {
            type: string;
            name: string;
        }[];
        export const outputs: {
            type: string;
            name: string;
        }[];
    }
    export { number_1 as number };
    export namespace addNumbers {
        const type_1: string;
        export { type_1 as type };
        const label_2: string;
        export { label_2 as label };
        const initialWidth_1: number;
        export { initialWidth_1 as initialWidth };
        const inputs_1: {
            type: string;
            name: string;
        }[];
        export { inputs_1 as inputs };
        const outputs_1: {
            type: string;
            name: string;
        }[];
        export { outputs_1 as outputs };
    }
}
