import { defineStore } from "pinia";
import { getmain } from "../scripts/stroge";
import Contactor from "../scripts/friends";

export const useGlobalstore = defineStore('global', {
    state: () => ({
        friend: [],
    }),
    actions: {
        init() {
            const main = getmain()
            main.contactor.forEach(element => {
                const contactor = new Contactor( element );
                this.friend.push(contactor);
            });
            return this.friend.length
        },pickfriend(sb){
            this.friend.forEach(element => {
                element.active=false
            });
            const activeone = this.friend.find(item => item.uin === sb.uin)
            console.log(activeone)
            activeone.activeit()
            return activeone
        },whoactive(){
            const one = this.friend.find(item => item.active === true)
            if (!one) {
                const main = getmain()
                const self = new Contactor(main)
                console.log(self)
                return self
            }
            return one
        }
    },getters: {
        acting: (state) => state.friend.find(item => item.active === true) ? state.friend.find(item => item.active === true) : {}
      },
})