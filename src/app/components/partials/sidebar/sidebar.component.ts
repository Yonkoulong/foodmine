import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarItems = [
    { name: 'Home', icons: 'home', route: '/', role: '' },
    { name: 'Login', icons: 'home', route: 'login', role: '' },    
    { name: 'Signup', icons: 'house', route: 'signup', role: '' },    
    { name: 'Todo-list', icons: 'edit', route: 'todo-app', role: '' },    
  ]
}
