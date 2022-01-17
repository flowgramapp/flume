export default ContextMenu;
declare function ContextMenu({ x, y, options, onRequestClose, onOptionSelected, label, hideHeader, hideFilter, emptyText }: {
    x: any;
    y: any;
    options?: any[] | undefined;
    onRequestClose: any;
    onOptionSelected: any;
    label: any;
    hideHeader: any;
    hideFilter: any;
    emptyText: any;
}): JSX.Element;
