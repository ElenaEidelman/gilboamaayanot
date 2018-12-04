export class Menu{
    id: number;
    label: string;
    icon: string;
    url: string;
    items? :Array<Menu>;
}