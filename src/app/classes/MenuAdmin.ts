export class MenuAdmin {
    id: number;
    level: number;
    name: string;
    href: string;
    type: string;
    children? : MenuAdmin[];
}