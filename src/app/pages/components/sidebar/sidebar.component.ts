import { Component, Input } from '@angular/core';
import {  Router, Event, NavigationSkipped } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() currentRoute: string = 'foodmine'
  
  constructor(private router: Router) { }

  sidebarItems = [
    { name: 'Home', icons: 'home', route: 'foodmine',  },  
    { name: 'Todo-list', icons: 'edit', route: 'todo-app',  },    
  ]

  ngOnChanges(): void {    
    if(this.currentRoute == '/') this.currentRoute = 'foodmine';
  }
  
  handleClickLogout() {
    localStorage.removeItem('USER');
    this.router.navigate(['sign-in']);
  }
}
