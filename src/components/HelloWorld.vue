<template>
  <div class="hello">
    <button @click="addLast">尾部加入一条数据</button>
    <button @click="addFirst">头部加入一条数据</button>
    <!--<button @click="deleteLast">删除最后一条数据</button>
    <button @click="deleteLast">删除第一条数据</button>-->
    <h2>Ecosystem</h2>
    <ul>
      <li v-for="item in people">
        <a href="http://router.vuejs.org/" target="_blank">
          {{item.name}}
        </a>
      </li>
    </ul>
    <ul class="states">
      <li v-for="(item,index) in stateNames" title="返回当前state" @click="backToState(index)" :class="{'active':
      activeIndex == index}">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      stateNames: [],
      stateIndex: 0,
      activeIndex: 0
    }
  },
  computed: {
    ...mapState({
      'people': 'people'
    })
  },
  methods: {
    ...mapMutations([
      'shoot',
      'restore',
      'reset',
      'addPeopleLast',
      'addPeopleFirst'/*,
      'deletePeopleLast',
      'deletePeopleFirst'*/
    ]),
    save(name){
      this.stateNames.push(name)
      this.shoot({
        key: name
      })
    },
    addIndex(step){
      step = step || 1
      this.stateIndex += step
    },
    muisIndex(step){
      step = step || 1
      this.stateIndex -= step
    },
    addLast(){
      this.addPeopleLast({
        name: 'James' + (this.stateIndex + 1),
        age: '33',
        sex: 'male'
      })
      this.addIndex()
      this.save('state' + this.stateIndex)
    },
    addFirst(){
      this.addPeopleFirst({
        name: 'James' + (this.stateIndex + 1),
        age: '33',
        sex: 'male'
      })
      this.addIndex()
      this.save('state' + this.stateIndex)
    },
    /*deleteLast(){
      if(this.people.length == 0){
        return
      }
      this.deletePeopleLast()
      this.addIndex()
      this.save('state' + this.stateIndex)
    },
    deleteLast(){
      if(this.people.length == 0){
        return
      }
      this.deletePeopleFirst()
      this.addIndex()
      this.save('state' + this.stateIndex)
    },*/
    backToState(index){
      this.activeIndex = index
      this.restore({
        key: this.stateNames[index]
      })
    }
  },
  mounted(){
    this.save('origin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  button{
    margin: 0 5px;
  }
  .states li{
    cursor: pointer;
  }
  .active{
    color: blue;
  }
</style>
