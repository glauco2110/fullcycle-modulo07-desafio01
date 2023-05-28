import Address from "../value-object/address";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "../event/customer-change-address.event";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean;
    private _rewardPoints: number;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._active = false;
        this._rewardPoints = 0;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) throw new Error("ID cannot be empty");
        if (this._name.length === 0) throw new Error("Name cannot be empty");
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) throw new Error("Address is mandatory to activate a customer");
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    get Address() {
        return this._address;
    }

    get name(): string { return this._name; }

    isActive(): boolean {
        return this._active;
    }

    get rewardPoints(): number { return this._rewardPoints; }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

    get id(): string { return this._id; }

    changeAddress(address: Address, eventDispatcher?: EventDispatcherInterface): void {
        this._address = address;
        if(eventDispatcher !== undefined) {
            const customerAddressChangedEvent = new CustomerChangeAddressEvent(this);
            eventDispatcher.notify(customerAddressChangedEvent);
        }
    }
}