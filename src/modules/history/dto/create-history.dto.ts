import { IsNotEmpty, IsString } from "class-validator";


export class CreateHistoryDto {
    @IsString()
    @IsNotEmpty()
    readonly changedDesc: string;
    
    @IsString()
    @IsNotEmpty()
    readonly changedDate: string;
}
