import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from './services/users/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private subscription: Subscription;
  title = 'foodmine';
  user: any = {};
  currentUser = localStorage.getItem('USER');
  currentRoute: string = '';
  isShowSidebar: boolean = true;
  
  constructor(private router: Router, private userService: UserService) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const newUrl = event.url.length > 1 ? event.url.slice(1) : event.url;
        this.currentRoute = newUrl;

        if (newUrl == 'sign-up' || newUrl == 'sign-in') {
          this.isShowSidebar = false;
        } else {
          this.userService.getUserProfile().subscribe((user) => {
            this.user = user;      
          });

          this.isShowSidebar = true;
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
