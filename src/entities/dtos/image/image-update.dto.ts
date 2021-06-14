import { Exclude } from "class-transformer";

export class ImageUpdateDto {
    
    id: number;

    fileName: string;

    fileContentType: string;

    file: string;
    
}