export function getPortRect(nodeId: any, portName: any, transputType: string | undefined, cache: any): any;
export function getPortRectsByNodes(nodes: any, forEachConnection: any): any;
export function calculateCurve(from: any, to: any): string | null;
export function deleteConnection({ id }: {
    id: any;
}): void;
export function deleteConnectionsByNodeId(nodeId: any): void;
export function updateConnection({ line, from, to }: {
    line: any;
    from: any;
    to: any;
}): void;
export function createSVG({ from, to, stage, id, outputNodeId, outputPortName, inputNodeId, inputPortName, stroke }: {
    from: any;
    to: any;
    stage: any;
    id: any;
    outputNodeId: any;
    outputPortName: any;
    inputNodeId: any;
    inputPortName: any;
    stroke: any;
}): SVGSVGElement;
export function getStageRef(editorId: any): HTMLElement | null;
export function createConnections(nodes: any, { scale, stageId }: {
    scale: any;
    stageId: any;
}, editorId: any, portTypes: any): void;
