import { Newsletter } from "./newsletter";

export class Mail {
  newsletter: Newsletter;
  constructor() {
    this.newsletter = new Newsletter();
  }
}
