/**
 * Created by feng.shen on 2018/4/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import snapshot from './plugins/vuex-snapshot'
// import snapshot from 'vuex-snapshot-plugin' npm安装包的形式引入插件

Vue.use(Vuex)

const state = {
  people: [
    {
      name: 'Jack',
      age: '25',
      sex: 'male'
    },
    {
      name: 'Samuel',
      age: '26',
      sex: 'male'
    },
    {
      name: 'Alex',
      age: '26',
      sex: 'female'
    }
  ]
}
const mutations = {
  addPeopleLast(state,people){
    state.people.push(people)
  },
  addPeopleFirst(state,people){
    state.people.unshift(people)
  },
  deletePeopleLast(state){
    state.people.pop()
  },
  deletePeopleFirst(state){
    state.people.shift()
  }
}
const actions = {

}
const getters = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [snapshot]
})
