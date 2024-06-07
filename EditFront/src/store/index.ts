/*
 * @Author: qiantang zhou.zili.128@gmail.com
 * @Date: 2024-06-05 11:29:31
 * @LastEditors: qiantang zhou.zili.128@gmail.com
 * @LastEditTime: 2024-06-05 11:29:47
 * @FilePath: \EditFront\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore} from 'pinia'

export const mainStore = defineStore('main',{
  state:()=>{
    return {
        helloPinia:'你好 世界!'
    }
  },
  getters:{},
  actions:{}
})