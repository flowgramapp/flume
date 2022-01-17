export function getInitialNodes(initialNodes: {} | undefined, defaultNodes: any[] | undefined, nodeTypes: any, portTypes: any, context: any): any;
export function connectNodesReducer(reducer: any, environment: any, dispatchToasts: any): (state: any, action: any) => any;
export default nodesReducer;
declare function nodesReducer(nodes: any, action: {} | undefined, { nodeTypes, portTypes, cache, circularBehavior, context }: {
    nodeTypes: any;
    portTypes: any;
    cache: any;
    circularBehavior: any;
    context: any;
}, dispatchToasts: any): any;
