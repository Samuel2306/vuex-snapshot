/**
 * Created by feng.shen on 2018/4/17.
 */
import * as utils from './utils'
const base_store = {
  STATE_INIT: 'STATE_INIT',
  mapping: {},
  id: 'uniqueModuleID',
  getStateMapping: function (guid) {
    return base_store.mapping[guid]
  }
}
export default (store => {
  var rootModule = store._modules.root
  addMutationToModule(rootModule, store, true)
})

function addMutationToModule (module, store, isRoot) {
  if (isRoot){
    module.userDefinedName = ''
  }
  module.guid = utils.guid.getGuid()
  module.copyState = {} // 用来保存进行快照时的复制出来的state
  module._rawModule.state[base_store.id] = module.guid
  // 为当前模块module在base_store.mapping中开辟一块空间，用来保存当前模块的快照
  // 找到这个空间的方法是根据这个模块的guid
  base_store.mapping[module.guid] = {}
  // 默认对初始状态保存一次快照
  base_store.mapping[module.guid][base_store.STATE_INIT] = utils.extend(true, {}, module._rawModule.state)

  // module._rawModule.state['name'] = module._rawModule.name
  addMutations(module._rawModule.mutations, module)
  // 遍历当前模块的所有mutation，然后进行注册
  // 因为动态添加了mutation，所以需要重新注册一下
  module.forEachMutation((mutation, key) => {
    const namespacedType = isRoot ? key : module.userDefinedName + '/' + key
    registerMutation(store, namespacedType, mutation, module)
  })
  module.forEachChild((child, key) => {
    // store 是Store类的当前实例
    // installModule(store, rootState, path.concat(key), child, hot)
    child.userDefinedName = key
    addMutationToModule(child, store)
  })

  function registerMutation (store, type, handler, local) {
    const entry = store._mutations[type] || (store._mutations[type] = [])
    if(!entry.length){
      entry.push(function wrappedMutationHandler (payload) {
        handler.call(store, local.state, payload)
      })
    }
  }
}

function addMutations (mutations, module) {
  // 拍照功能实现思路：首先根据module的guid在mapping里面为module开辟一个空间（一个对象），
  // 然后每次拍照的时候先得到一个当前module的state快照，并为其保存一个属性名（key）
  // 然后存到mapping的对应模块的空间（一个对象）中
  mutations.shoot = function (state, data) {
    if (!data.key) {
      console.warn('必须为快照指定一个名称，名称必须是字符串。快照名称请在data的key属性里面设置')
    }
    module.copyState = utils.extend(true, {}, state)
    var stateMapping = base_store.getStateMapping(module.copyState[base_store.id])
    stateMapping[data.key] = module.copyState
  }

  // 根据key复原指定快照
  mutations.restore = function (state, data) {
    var stateMapping = base_store.getStateMapping(state[base_store.id]);
    utils.extend(true, state, stateMapping[data.key])
  }

  // 清楚状态设置，恢复最初状态
  mutations.reset = function (state) {
    var stateMapping = base_store.getStateMapping(state[base_store.id])
    utils.extend(true, state, stateMapping[base_store.STATE_INIT])
  }
}
