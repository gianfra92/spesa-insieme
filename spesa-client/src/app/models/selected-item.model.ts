import { User } from "./user.model";

export class SelectedItem {
  constructor(
    public user: User,
    public quantity: number
  ) {}
}
