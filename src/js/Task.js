import { Guid } from "js-guid";

export default class Task {
    constructor(name, description, order, status) {
        this.id = Guid.newGuid().StringGuid;
        this.name = name;
        this.description = description;
        this.order = order;
        this.status = status;
    }
}