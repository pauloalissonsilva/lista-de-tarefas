import { uuidV4 } from "../../utils/uuid.js";

class Task {

  id: string;
  title: string;
  description: string;
  finished: false;
  user_id: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.created_at = new Date();
    }
  }

}

export { Task }

