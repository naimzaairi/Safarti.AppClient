import { UserDTO } from "./user";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponseDTO {
    token: string;
    result: boolean;
    errors: any[];
}

export interface LoginResponseDTO {
    userDTO: UserDTO;
    token: string;
    result: boolean;
    errors: any[];
}

