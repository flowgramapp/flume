import React from "react";
declare type Props = {
    comments?: any;
    nodes?: any;
    nodeTypes?: Object;
    portTypes?: Object;
    defaultNodes?: any[];
    context?: Object;
    onChange?: any;
    onCommentsChange?: any;
    renderNodeHeader?: any;
    initialScale?: any;
    spaceToPan?: boolean;
    hideComments?: boolean;
    disableComments?: boolean;
    disableZoom?: boolean;
    disablePan?: boolean;
    circularBehavior?: any;
    debug?: any;
};
declare type Handle = {
    getNodes: () => any;
    getComments: () => any;
};
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<Handle>>;
export default _default;
export { FlumeConfig, Controls, Colors } from "./typeBuilders";
export { RootEngine } from "./RootEngine";
export declare const useRootEngine: (nodes: any, engine: any, context: any) => any;
