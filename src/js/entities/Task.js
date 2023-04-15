import { Guid } from "js-guid";

export default class Task {
  constructor(id, name, description, order, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.order = order;
    this.status = status;
    this.checkingAvailabilityId();
  }

  checkingAvailabilityId() {
    if (!this.id) {
      this.id = Guid.newGuid().StringGuid;
    }
  }
}
