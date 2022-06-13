import { uuidV4 } from "../../utils/uuid.js";

export class User {

  id?: string;
  username: string;
  email: string;
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}



