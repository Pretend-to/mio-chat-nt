import { defineStore } from "pinia";

export const useContactorstore = defineStore('contactor',{
    state:() => ({ 
        uin:10000,
        newmsg:false,
        editing:false,
        inited:[]
     }),
})