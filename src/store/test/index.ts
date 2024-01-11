import { defineStore } from 'pinia'
export const testStore = defineStore('testStore', {
    //定义state
    state: () => {
        return {
            count: 10
        }
    },
    //定义getters
    getters: {
        //获取count
        getCount(state) {
            return state.count
        }
    },
    //定义actions 操作state
    //不能使用箭头函数，使用箭头函数会改变this的指向
    actions: {
        setCount() {
            this.count++;
        }
    }
})