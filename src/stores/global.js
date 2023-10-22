import { defineStore } from "pinia";
import { getmain } from "../scripts/stroge";
import Contactor from "../scripts/friends";

export const ussGlobalstore = defineStore('global', {
    state: () => ({
        friend: []
    }),
    actions: {
        init() {
            const main = getmain()
            main.contactor.forEach(element => {
                const contactor = new Contactor( element );
                this.friend.push(contactor);
            });
            return this.friend.length
        },
        pickfriend(uin){
            this.friend.find(function(element){
                return element.uin === uin
            })
        }
    }
})