export namespace Controls {
    function text(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
    function select(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
    function number(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
    function checkbox(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
    function multiselect(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
    function custom(config: any): {
        type: any;
        label: any;
        name: any;
        defaultValue: any;
        setValue: any;
    };
}
export namespace Colors {
    const yellow: string;
    const orange: string;
    const red: string;
    const pink: string;
    const purple: string;
    const blue: string;
    const green: string;
    const grey: string;
}
export function getPortBuilders(ports: any): any;
export class FlumeConfig {
    constructor(config: any);
    nodeTypes: any;
    portTypes: any;
    addRootNodeType(config: any): FlumeConfig;
    addNodeType(config: any): FlumeConfig;
    removeNodeType(type: any): FlumeConfig;
    addPortType(config: any): FlumeConfig;
    removePortType(type: any, { skipDynamicNodesCheck }?: {
        skipDynamicNodesCheck?: boolean | undefined;
    }): FlumeConfig;
}
