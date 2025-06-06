import { SelectedItem } from './selected-item.model';

export class Item {
  constructor(
    public _id:string,
    public name: string,
    public quantity: number,
    public selectedBy: SelectedItem[] = [],
    public selection: number = 0, // usato temporaneamente nel form
  ) {}
}
