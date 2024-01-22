import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function createConfirmPasswordValidator(): ValidatorFn {

    return (control: AbstractControl<string, string>) : ValidationErrors | null => {
       const passwordConfirm = control?.value;
        const password = control?.parent?.get('password')?.value;
        
        if(password != '' && passwordConfirm !== password) {
            return { notMatching: true }
        }
        
        return null;
    }
}