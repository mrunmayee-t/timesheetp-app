import { MatTableDataSource } from '@angular/material/table';


export class DashboardViewModel {
    
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

    onInitDashboardViewModel(){
        
    }
}

export interface Element {
    project: string;
    position: number;
    tasks: string;
}

const ELEMENT_DATA: Element[] = [
    {
        position: 1,
        project: 'project_1',
        tasks: 'task_1'
    },
    {
        position: 2,
        project: 'project_2',
        tasks: 'task_2'
    }
]
  