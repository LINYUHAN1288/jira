export interface Task {
    id: number;
    name: string;
    processorId: string;
    projectId: number;
    epicId: string;
    boardId: string | number;
    typeId: string;
    note: string;
}
