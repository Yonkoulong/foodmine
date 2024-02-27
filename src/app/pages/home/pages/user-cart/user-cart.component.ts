import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/User";

@Component({
    selector: 'fm-user-cart',
    templateUrl: './user-cart.component.html',
    styleUrls: ['./user-cart.component.scss']

})

export class UserCartComponent {
    user$: Observable<User>;
    user: User = {
        _id: "",
        username: '',
        fullName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        role: '',
        imageUser: '',
    };

    constructor(private store: Store<{ user: User}>) {
        this.user$ = this.store.select('user');
        this.user$.subscribe((user) => {
            this.user = user;      
        })        
    } 

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.user$.subscribe().unsubscribe();
    }
}

