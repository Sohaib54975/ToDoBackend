import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttachmentDto {
    @IsString()
    @IsNotEmpty()
    readonly fileName: string;

    @IsString()
    @IsNotEmpty()
    readonly filePath: string;
}
