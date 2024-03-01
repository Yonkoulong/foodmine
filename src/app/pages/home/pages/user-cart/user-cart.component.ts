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
    user$: Observable<{userInfo: User}> = this.store.select('user');
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

    constructor(private store: Store<{ user: {userInfo: User}}>) {
        this.user$.subscribe((user) => {
            this.user = user.userInfo;                  
        })        
    } 

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.user$.subscribe().unsubscribe();
    }
}

