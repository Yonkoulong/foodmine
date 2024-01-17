import { Category } from './Category';
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    category: Category; 
    endDate: Date;
    subTask?: SubTask[];
}

export interface SubTask {
    id: number;
    title: string;
    completed: boolean;
}