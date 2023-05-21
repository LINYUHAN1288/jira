export interface Task {
    id: number;
    name: string;
    processorId: string | number;
    projectId: number;
    epicId: string | number;
    boardId: string | number;
    typeId: string | number;
    note: string;
}
