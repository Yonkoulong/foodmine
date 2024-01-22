import { Component, Input } from '@angular/core';
import {  Router, Event, NavigationSkipped } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() currentRoute: string = '/'
  
  constructor(private router: Router) {}

  sidebarItems = [
    { name: 'Home', icons: 'home', route: '/',  },  
    { name: 'Todo-list', icons: 'edit', route: 'todo-app',  },    
  ]

  handleClickLogout() {
    localStorage.removeItem('USER');
    this.router.navigate(['sign-in']);
  }
}
