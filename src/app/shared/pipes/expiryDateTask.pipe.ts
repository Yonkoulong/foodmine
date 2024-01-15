import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'expiryDateTask',
})

export class ExpiryDateTaskPipe implements PipeTransform {
    transform(dateRemaining: number): string {
       if(dateRemaining >= 0) {
            return `Remaining ${dateRemaining} ${dateRemaining == 1 ? "day" : "days"}`;
       } else {
           return `This task is past ${dateRemaining * -1}  ${dateRemaining == 1 ? "day" : "days"}`;
       }
    }
}