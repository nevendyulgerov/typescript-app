
/**
 * Library: Ammo
 * Author: Neven Dyulgerov
 * v1.5.2
 *
 * Provides general purpose utility belt for building web applications with JS
 * Ammo is available as the global variable {ammo}
 * Released under the MIT license
 */

const base = window;

/**
 * @description Provide DOM context
 * @param context
 * @returns {*|HTMLDocument}
 */
const contx = (context: any) => context || base.document;

/**
 * @description Event handler for DOM Ready
 * @param callback
 */
export const onDomReady = (callback: () => {}) => {
  base.document.addEventListener('DOMContentLoaded', callback);
};

/**
 * @description Event handler for hover
 * @param domEls
 * @param onIn
 * @param onOut
 */
export const onHover = (domEls: HTMLElement[], onIn: (e: object) => {}, onOut: (e: object, hovered: object) => {}) => {
  let lastHovered: object;

  each(domEls, (el: HTMLElement) => {
    el.addEventListener('mouseenter', (e) => {
      lastHovered = e.target;
      onIn(e);
    });
    el.addEventListener('mouseout', (e) => {
      onOut(e, lastHovered);
    });
  });
};

/**
 * @description Delegate event to given selector with className
 * @param event
 * @param className
 * @param callback
 * @param context
 */
export const delegateEvent = (event, className, callback, context) => {
  let classNames = className.indexOf('.') > -1 ? className.split('.') : [className];
  classNames = classNames.filter(item => !isUndef(item) && item !== '');
  let containsCounter = 0;

  contx(context).addEventListener(event, (e) => {
    if ( e.target ) {
      classNames.map(className => {
        if ( e.target.classList.contains(className) ) {
          containsCounter++;
        }
        return className;
      });
    }

    if ( containsCounter === classNames.length && containsCounter > 0 ) {
      callback(e);
    }
    containsCounter = 0;
  });
};

/**
 * @description Get node by given selector
 * @param selector
 * @param context
 * @returns {Node}
 */
export const getEl = (selector, context) => contx(context).querySelector(selector);

/**
 * @description Get node list by given selector
 * @param selector
 * @param context
 */
export const getEls = (selector, context) => contx(context).querySelectorAll(selector);

/**
 * @description Check if element is hovered
 * @param selector
 * @returns {boolean}
 */
export const isHovered = (selector) => {
  const domEl = getEl(selector);
  return domEl.parentNode.querySelector(':hover') === domEl;
};

/**
 * @description Append HTML content after the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendAfterEnd = (html, context) => {
  contx(context).insertAdjacentHTML('afterend', html.toString());
  return this;
};

/**
 * @description Append HTML content before the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendBeforeEnd = (html, context) => {
  contx(context).insertAdjacentHTML('beforeend', html.toString());
  return this;
};

/**
 * @description Prepend HTML content after the beginning of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const prependAfterBeginning = (html, context) => {
  contx(context).insertAdjacentHTML('afterbegin', html.toString());
  return this;
};

/**
 * @description Prepend HTML content before the beginning of a node
 * @param html
 * @param context
 */
export const prependBeforeBeginning = (html, context) => {
  contx(context).insertAdjacentHTML('beforebegin', html.toString());
  return this;
};

/**
 * @description Remove node from the DOM
 * @param domEl
 */
export const removeEl = (domEl) => {
  domEl.parentNode.removeChild(domEl);
  return this;
};

/**
 * @description Iterate object own properties
 * @param elements
 * @param callback
 */
export const each = (elements, callback) => {
  Object.keys(elements).forEach((key, index) =>
    callback(elements[key], index));
};

/**
 * @description Create an object copy with json conversion
 * JSON Copy
 * @param obj
 */
export const jsonCopy = obj => JSON.parse(JSON.stringify(obj));

/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
export const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);

/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
export const isNull = val => val === null;

/**
 * @description Check if value is of type 'number'
 * @param val
 * @returns {boolean}
 */
export const isNum = val => typeof val === 'number' && !isNaN(val);

/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = val => typeof val === 'function';

/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
export const isArr = val => Array.isArray(val);

/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
export const isStr = val => typeof val === 'string';

/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
export const isUndef = val => typeof val === 'undefined';

/**
 * @description Check if value is of type 'boolean'
 * @param val
 * @returns {boolean}
 */
export const isBool = val => typeof val === 'boolean';

/**
 * @description Check if object has property
 * @param obj
 * @param prop
 * @returns {boolean}
 */
export const hasProp = (obj, prop) => obj.hasOwnProperty(prop);

/**
 * @description Check if object has method
 * @param obj
 * @param method
 * @returns {boolean}
 */
export const hasMethod = (obj, method) => hasProp(obj, method) && isFunc(obj[method]);

/**
 * @description Check if object has key
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasKey = (obj, key) => getKeys(obj).indexOf(key) > -1;

/**
 * @description Get object keys
 * @param obj
 * @returns {Array}
 */
export const getKeys = obj => Object.keys(obj);

/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
export const eachKey = (obj, callback) => {
  Object.keys(obj).forEach((k, i) => callback(obj[k], k, i));
};

/**
 * @description Get url param
 * @param name
 * @returns {Array|{index: number, input: string}|*|string}
 */
export const getUrlParam = (name) => {
  const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/**
 * @description Get random integer between two numbers
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Iterate recursively
 * @param handler
 * @param complete
 * @param index
 * @returns {*}
 */
export const recurIter = (handler, complete, index) => {
  index = index || 0;
  handler(index, (canRecur) => {
    if ( ! canRecur ) {
      return complete();
    }
    recurIter(handler, complete, ++index);
  });
};

/**
 * @description Poll over an interval of time
 * @param handler
 * @param complete
 * @param interval
 */
export const poll = (handler, complete, interval) => {
  setTimeout(() => {
    handler((canPoll) => {
      if ( canPoll ) {
        return poll(handler, complete, interval);
      }
      complete();
    });
  }, interval);
};

/**
 * @description Buffer high-frequency events
 * @returns {function}
 */
export const buffer = function() {
  let timers = {};

  return (id, ms, clb) => {
    if ( ! id ) {
      timers[id] = '0';
    }
    if ( timers[id] ) {
      clearTimeout(timers[id]);
    }
    timers[id] = setTimeout(clb, ms);
  };
};

/**
 * @description Augment object with properties from other objects
 * @returns {object}
 */
export const extend = function() {
  let obj = arguments[0];
  let enhancedObj = Object.assign(obj, {});
  let extenders = [];
  eachKey(arguments, (argument, key, index) => {
    if ( index > 0 ) {
      extenders.push(argument);
    }
  });
  extenders.forEach((extender) => {
    Object.assign(enhancedObj, extender);
  });
  return enhancedObj;
};

/**
 * @description Run methods excluding
 * @param obj
 * @param excludes
 */
export const runMethods = (obj, excludes) => {
  const excludedMethods = isArr(excludes) ? excludes : [];

  eachKey(obj, (prop, key) => {
    if (!isFunc(prop) || excludedMethods.indexOf(key) > -1) {
      return false;
    }
    prop();
  });
};

/**
 * @description Parse variable value by type
 * @param val
 * @returns {*}
 */
export const parseToType = val => {
  if (!isStr(val)) {
    return undefined;
  }

  if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  } else if (val === 'null') {
    return null;
  } else if (+val + '' === val) {
    return +val;
  }

  return val;
};

/**
 * @description Create sequential execution for async functions
 * @returns {{chain: chain, execute: execute}}
 */
export const sequence = function() {
  const chained = [];
  let value;
  let error;

  const chain = function(func) {
    if ( chained ) {
      chained.push(func);
    }
    return this;
  };
  const execute = function(index = 0) {
    let callback;
    if ( ! chained || index >= chained.length ) {
      return true;
    }

    callback = chained[index];
    callback({
      resolve: function(_value) {
        value = _value;
        error = null;
        execute(++index);
      },
      reject: function(_error) {
        error = _error;
        value = null;
        execute(++index);
      },
      response: {
        value: value,
        error: error
      }
    });
  };

  return { chain, execute };
};

/**
 * @description Determine type checker
 * @param type
 * @returns {*}
 */
export const determineTypeChecker = type => {
  switch ( type ) {
    case 'number':
      return isNum;
    case 'object':
      return isObj;
    case 'null':
      return isNull;
    case 'function':
      return isFunc;
    case 'array':
      return isArr;
    case 'string':
      return isStr;
    case 'undefined':
      return isUndef;
    case 'bool':
      return isBool;
    default:
      return isUndef;
  }
};

/**
 * @description Set strong typed object
 * @param config
 * @returns {*}
 */
export const setStrongTypedObject = config => {
  const proxy = {};
  eachKey(config, (obj, key) => proxy[key] = obj.value);

  return new Proxy(proxy, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      const type = config[prop].type;
      const typeChecker = determineTypeChecker(type);

      if ( ! typeChecker(value) ) {
        throw new Error(`[Ammo.StrongType] Invalid type. Expected type for field {${prop}} is {${type}}`);
      }

      target[prop] = value;
      return true;
    }
  });
};

/**
 * @description Set style property for given node
 * @param selection
 * @param index
 * @param prop
 * @param value
 */
const style = (selection, prop, value, index) => {
  selection.style.setProperty(prop, isFunc(value) ? value(selection, index) || selection.style.getProperty(prop) : value, '');
};

/**
 * @description Set attribute property for given node
 * @param selection
 * @param prop
 * @param value
 * @param index
 */
const attr = (selection, prop, value, index) => {
  const currValue = selection.getAttribute(prop);
  selection.setAttribute(prop, isFunc(value) ? value(selection, currValue, index) || currValue : value);
};

/**
 * @description Set innerHTML for given node
 * @param selection
 * @param value
 * @param index
 */
const elText = (selection, value, index) => {
  selection.innerHTML = isFunc(value) ? value(selection.innerHTML, index) || selection.innerHTML : value;
};

/**
 * @description Filter nodes
 * @param selection
 * @param value
 * @param selector
 * @param index
 * @returns {*}
 */
const filterNodes = (selection, value, selector, index) => {
  if ( isFunc(value) ) {
    return value(selection, index);
  }
  if ( isStr(value) ) {
    if ( value.indexOf(':') === -1 ) {
      return selection.classList.contains(value);
    }

    const matches = selection.parentNode.querySelectorAll(`${selector}${value}`);
    let isMatch = false;
    each(matches, el => {
      if ( el.isSameNode(selection) && ! isMatch ) {
        isMatch = true;
      }
    });
    return isMatch;
  }
};

/**
 * @description DOM manipulation API for single node
 * @param selector
 * @param context
 * @returns {object}
 */
export const select = function(selector, context) {
  let selection = isStr(selector) ? getEl(selector, context) : selector;
  return {
    find(findSelector) {
      selection = getEl(findSelector, selection);
      return this;
    },
    text(value) {
      elText(selection, value, 0);
      return this;
    },
    style(prop, value) {
      style(selection, prop, value, 0);
      return this;
    },
    attr(prop, value) {
      attr(selection, prop, value, 0);
      return this;
    },
    data(data) {
      selection.innerHTML = data;
      return this;
    },
    on(event, callback) {
      selection.addEventListener(event, callback);
      return this;
    },
    get: () => selection
  };
};

/**
 * @description DOM manipulation API for node lists
 * @param selector
 * @param context
 * @returns {object}
 */
export const selectAll = function(selector, context) {
  let selection = isStr(selector) ? getEls(selector, context) : selector;
  let filtered;

  return {
    filter(value) {
      filtered = [];
      each(selection, (el, index) => {
        if ( filterNodes(el, value, selector, index) ) {
          filtered.push(el);
        }
      });
      selection = filtered;
      return this;
    },
    find(findSelector) {
      if ( filtered ) {
        filtered = getEls(findSelector, filtered.firstChild);
      } else {
        selection = getEls(findSelector, selection.firstChild);
      }
      return this;
    },
    text(value) {
      each(filtered || selection, (el, index) => elText(el, value, index));
      return this;
    },
    style(prop, value) {
      each(filtered || selection, (el, index) => style(el, prop, value, index));
      return this;
    },
    attr(prop, value) {
      each(filtered || selection, (el, index) => attr(el, prop, value, index));
      return this;
    },
    data(data) {
      each(filtered || selection, (el, index) => el.innerHTML = data[index]);
      return this;
    },
    on(event, callback) {
      each(filtered || selection, (el) => el.addEventListener(event, callback));
      return this;
    },
    each(handler) {
      each(filtered || selection, handler);
      return this;
    },
    eq(index) {
      const nodes = filtered || selection;
      return nodes.length > 0 && isObj(nodes[index]) ? nodes[index]: undefined;
    },
    index(indexSelector) {
      let matchIndex = -1;
      each(filtered || selection, (el, index) => {
        if ( el.classList.contains(indexSelector) && matchIndex === -1 ) {
          matchIndex = index;
        }
      });
      return matchIndex;
    },
    async(handler, complete) {
      const sequencer = sequence();

      each(filtered || selection, (el, index) => {
        sequencer.chain(seq => handler(seq.resolve, el, index));
      });

      if ( isFunc(complete) ) {
        sequencer.chain(() => complete());
      }

      sequencer.execute();
      return this;
    },
    get: () => filtered || selection
  };
};
