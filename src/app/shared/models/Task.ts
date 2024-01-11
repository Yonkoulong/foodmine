import { Category } from './Category';
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    category: Category; 
    endDate: Date;
}