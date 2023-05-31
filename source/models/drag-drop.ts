// Drag & drop interfaces
    export interface Draggable {
        dragStartHandler(ev: DragEvent): void
        dragEndHandler(ev: DragEvent): void
    }
    
    export interface DragTarget {
        dragOverHandler(ev: DragEvent): void
        dropHandler(ev: DragEvent): void
        dragLeaveHandler(ev: DragEvent): void
    }