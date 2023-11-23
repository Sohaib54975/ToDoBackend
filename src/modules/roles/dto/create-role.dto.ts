import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    readonly roleName: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly update: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly read: boolean;
}
