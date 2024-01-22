import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createDatePickerValidator(): ValidatorFn {

    return (control: AbstractControl) : ValidationErrors | null => {
        const errorObj = control?.errors;
        const value = control?.value;
        let msgError: string = ""

        if(errorObj && errorObj?.["matDatepickerParse"]?.text) {
            
            if(isNaN(Date.parse(errorObj?.["matDatepickerParse"]?.text))) { 
                msgError = "End date is not valid"; 
            } 

        }
        
        if(!value && !errorObj?.["matDatepickerParse"]?.text) { msgError = "End date is not empty"; }
                
        return msgError ? { message: msgError } : null
    }
}