import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { plainToInstance } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";
interface ClassConstructor {
    new(...args: any[]): {}
    // Accept only object Class
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
}
export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run somthing before a response is handled
        // by the response handler
        return handler.handle().pipe(
            map((data: any) => {
                // Run somthing before a response is sent out
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                    // remove extra values from the response
                })
            })
        )
    }
}