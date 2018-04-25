/**
 * Created by feng.shen on 2018/4/17.
 */
let guid = {
  getGuid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == "[object " + type + "]"
  }
}
let isObject = isType("Object")
let isString = isType("String")
let isArray = Array.isArray || isType("Array")
let isFunction = isType("Function")
let isUndefined = isType("Undefined")
let isBoolean = isType("Boolean")
let type={
  isObject,
  isString,
  isArray,
  isFunction,
  isUndefined,
  isBoolean
};

let extend = function(){
  var index = 0,isDeep = false,obj,copy,destination,source,i
  if(isBoolean(arguments[0])) {
    index = 1
    isDeep = arguments[0]
  }
  for(i = arguments.length - 1;i > index;i--) {
    destination = arguments[i - 1]
    source = arguments[i]
    if(isObject(source) || isArray(source)) {
      for(var property in source) {
        obj = source[property]
        if(isDeep && ( isObject(obj) || isArray(obj) ) ) {
          copy = isObject(obj) ? {} : []
          var extended = extend(isDeep, copy, obj)
          destination[property] = extended
        }else {
          destination[property] = source[property]
        }
      }
    } else {
      destination = source
    }
  }
  return destination
}

export {guid, type, extend}

