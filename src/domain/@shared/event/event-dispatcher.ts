import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = this.eventHandlers[eventName].filter((handler) => {
                return handler !== eventHandler;
            });
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((handler) => {
                handler.handle(event);
            });
        }
    }

}