import { defineStore } from "pinia";
import { getmain,setglobal,getglobal } from "../scripts/stroge";
import Contactor from "../scripts/friends";

export const useGlobalstore = defineStore('global', {
    state: () => ({
        friend: [],
    }),actions: {
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
        },stroge(){
            setglobal(this.friend)
        },async load(){
            const data = await getglobal()
            console.log(data)
            if(!data) this.init()
            else { 
                data.forEach(element => {
                    const contactor = new Contactor( element );
                    element.history.forEach(message => {
                        contactor.history.push(message)
                    })
                    this.friend.push(contactor);
                });
            }
        }
    },getters: {
        acting: (state) => state.friend.find(item => item.active === true) ? state.friend.find(item => item.active === true) : {}
      },
})