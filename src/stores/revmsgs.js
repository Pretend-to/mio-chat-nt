import { defineStore } from 'pinia'

export const useMsgsstore = defineStore('msgs', {
    state: () => ({
        msgs: []
    }), actions: {
        resign(contactor, reqid) {
            const task = {
                uin: contactor.uin,
                reqid: reqid
            }
            this.msgs.push(task)
            console.log('store 获得任务')
        }
    }, getters: {
        leng: (state) => state.msgs.length
    }
})