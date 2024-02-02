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

export function slugifyVietnamese(str: string) {
    const map: { [key: string]: string }  = {
        'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'đ': 'd',
        'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y'
    };

    str = str.toLowerCase();
    str = str.split('').map(function(char: string) {
        return map[char] || char;
    }).join('');

    return str.replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}