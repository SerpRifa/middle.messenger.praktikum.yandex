import { expect } from "chai";
import {store, StoreEvents} from "./shitstore";

describe("StoreManager", () => {
    it("Set branch chat.chats", () => {
        store.on(StoreEvents.Updated, () => {});
        store.set("chat.chats", [{chat: "1"}, {chat: "2"} ]);
        expect(store.getState().chat.chats.length).eql(2);
    });

    it("Add Messages", () => {
        store.on(StoreEvents.Updated, () => {});
        store.set("chat.messages", [{message: "1"}, {message: "2"} ]);
        store.addMassage( [{
            chat_id: 2,
            content: 'string',
            file: 'any',
            id: 2,
            is_read: true,
            time: "string",
            type: "string",
            user_id: 2} ]);
        expect(store.getState().chat.messages.length).eql(3);
    });

    it("Set branch chat.chats", () => {
        let test = 0;
        store.on(StoreEvents.Updated, () => {
            test++;
        });
        store.set("chat.chats", [{chat: "1"}, {chat: "2"} ]);
        expect(test).eql(1);
    });
});