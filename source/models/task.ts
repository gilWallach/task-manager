    export enum TaskStatus { Active, Done }
    
    export class Task {
        constructor(
            public title: string,
            public description: string,
            public priority: number,
            public status: TaskStatus,
            public createdAt: number,
            public id?: string
            ) { }
    }