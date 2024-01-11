import { Component } from '@angular/core';
import {  Router, Event, NavigationSkipped } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentUrl = '';
  
  constructor(private router : Router) {}

  // ngOnInit(){
  //   this.router.events.subscribe((event: Event ) => {
  //     if(event instanceof NavigationSkipped){
  //       this.currentUrl = event.url?.replace('/', '');
  //     }
  //   })
  // }

  // isActiveRoute(route : string){
  //   console.log()
  //   if(!this.currentUrl) return true;
  //   return this.currentUrl.includes(route);
  // }

  sidebarItems = [
    { name: 'Home', icons: 'home', route: '/',  },
    { name: 'Login', icons: 'home', route: 'login',  },    
    { name: 'Signup', icons: 'house', route: 'signup',  },    
    { name: 'Todo-list', icons: 'edit', route: 'todo-app',  },    
  ]

  
}
