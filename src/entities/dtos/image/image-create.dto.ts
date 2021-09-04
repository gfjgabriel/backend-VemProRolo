import { Exclude } from "class-transformer";

export class ImageCreateDto {

    id: number;

    fileName: string;

    fileContentType: string;

    file: string;
    
}