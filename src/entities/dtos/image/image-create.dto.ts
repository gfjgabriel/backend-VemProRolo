import { Exclude } from "class-transformer";

export class ImageCreateDto {
    
    fileName: string;

    fileContentType: string;

    file: string;
    
}