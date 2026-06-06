import type { Configuration } from "../configurations/configuration.type";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    configurations?: Configuration[]
}