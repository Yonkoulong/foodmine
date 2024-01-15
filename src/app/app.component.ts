import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foodmine';
  currentUser = localStorage.getItem('USER');
  currentRoute: string = "";
  isShowSidebar: boolean = true;

  constructor(private router: Router) {  
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const newUrl =  event.url.length > 1 ? event.url.slice(1) : event.url;
        this.currentRoute = newUrl;
        
        if(newUrl == "sign-up" || newUrl == "login") {
          this.isShowSidebar = false;
        } else {
          this.isShowSidebar = true;
        }
      }
    })
  }

}
