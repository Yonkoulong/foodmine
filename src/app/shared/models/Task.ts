import { Category } from './Category';
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    category: Category; 
    startDate: number;
    endDate: number;
}