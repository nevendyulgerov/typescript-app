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
export const onDomReady = (callback: () => void) => {
  base.document.addEventListener('DOMContentLoaded', callback);
};

/**
 * @description Get node by given selector
 * @param selector
 * @param context
 * @returns {Node}
 */
export const getEl = (selector: string, context?: undefined | HTMLElement) => contx(context).querySelector(selector);

/**
 * @description Get node list by given selector
 * @param selector
 * @param context
 */
export const getEls = (selector: string | HTMLElement, context?: undefined | HTMLElement) =>
  contx(context).querySelectorAll(selector);

/**
 * @description Check if element is hovered
 * @param selector
 * @returns {boolean}
 */
export const isHovered = (selector: string) => {
  const domEl = getEl(selector);
  return domEl.parentNode.querySelector(':hover') === domEl;
};

/**
 * @description Append HTML content after the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendAfterEnd = (html: string, context: undefined | HTMLElement) => {
  contx(context).insertAdjacentHTML('afterend', html.toString());
  return this;
};

/**
 * @description Append HTML content before the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendBeforeEnd = (html: string, context: undefined | HTMLElement) => {
  contx(context).insertAdjacentHTML('beforeend', html.toString());
  return this;
};

/**
 * @description Prepend HTML content after the beginning of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const prependAfterBeginning = (html: string, context: undefined | HTMLElement) => {
  contx(context).insertAdjacentHTML('afterbegin', html.toString());
  return this;
};

/**
 * @description Prepend HTML content before the beginning of a node
 * @param html
 * @param context
 */
export const prependBeforeBeginning = (html: string, context: undefined | HTMLElement) => {
  contx(context).insertAdjacentHTML('beforebegin', html.toString());
  return this;
};

/**
 * @description Remove node from the DOM
 * @param domEl
 */
export const removeEl = (domEl: HTMLElement) => {
  domEl.parentNode.removeChild(domEl);
  return this;
};

/**
 * @description Iterate object own properties
 * @param obj
 * @param callback
 */
export const each = (obj: object, callback: (prop: any, index?: number) => void) => {
  Object.keys(obj).forEach((key: string, index: number) =>
    callback((obj as any)[key], index));
};

/**
 * @description Create an object copy with json conversion
 * JSON Copy
 * @param obj
 */
export const jsonCopy = (obj: object) =>
  JSON.parse(JSON.stringify(obj));

/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
export const isObj = (val: any) =>
  typeof val === 'object' && !isArr(val) && !isNull(val);

/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
export const isNull = (val: any) => val === null;

/**
 * @description Check if value is of type 'number'
 * @param val
 * @returns {boolean}
 */
export const isNum = (val: any) => typeof val === 'number' && !isNaN(val);

/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = (val: any) => typeof val === 'function';

/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
export const isArr = (val: any) => Array.isArray(val);

/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
export const isStr = (val: any) => typeof val === 'string';

/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
export const isUndef = (val: any) => typeof val === 'undefined';

/**
 * @description Check if value is of type 'boolean'
 * @param val
 * @returns {boolean}
 */
export const isBool = (val: any) => typeof val === 'boolean';

/**
 * @description Check if object has property
 * @param obj
 * @param prop
 * @returns {boolean}
 */
export const hasProp = (obj: object, prop: string) => obj.hasOwnProperty(prop);

/**
 * @description Check if object has method
 * @param obj
 * @param method
 * @returns {boolean}
 */
export const hasMethod = (obj: object, method: string) =>
  hasProp(obj, method) && isFunc((obj as any)[method]);

/**
 * @description Check if object has key
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasKey = (obj: object, key: string) =>
  getKeys(obj).indexOf(key) > -1;

/**
 * @description Get object keys
 * @param obj
 * @returns {Array}
 */
export const getKeys = (obj: object) => Object.keys(obj);

/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
export const eachKey = (obj: object, callback: (key: string, prop?: any, index?: number) => void) => {
  Object.keys(obj).forEach((key: string, index: number) =>
    callback(key, (obj as any)[key], index));
};

/**
 * @description Get url param
 * @param name
 * @returns {Array|{index: number, input: string}|*|string}
 */
export const getUrlParam = (name: string) => {
  const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/**
 * @description Get random integer between two numbers
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Buffer high-frequency events
 * @param {} options
 * @returns {(callback: Callback) => void}
 */
export const buffer = (options: {id?: string, timeout?: number}) => {
  const timers: object = {};
  type Callback = () => void;
  const id: string = options.id || `${Date.now}`;
  const timeout: number = options.timeout || 500;

  return (callback: Callback) => {
    if ((timers as any)[id]) {
      clearTimeout((timers as any)[id]);
    }
    (timers as any)[id] = setTimeout(callback, timeout);
  };
};

/**
 * @description Run methods in parallel excluding specific methods
 * @param obj
 * @param excludes
 */
export const runMethodsInParallel = (obj: object, excludes?: string[]) => {
  const excludedMethods = isArr(excludes) ? excludes : [];

  eachKey(obj, (key: string, prop: any) => {
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
export const parseToType = (val: any) => {
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
export const sequence = () => {
  const chained: any = [];
  let value: any;
  let error: any;

  const chain = (func: (seq?: object) => void) => {
    if (chained) {
      chained.push(func);
    }
    return {chain, execute};
  };
  const execute = (index?: number) => {
    index = index || 0;
    let callback: (seq: object) => void;
    if (!chained || index >= chained.length) {
      return {chain, execute};
    }

    callback = chained[index];
    callback({
      resolve(val?: any) {
        value = val;
        error = null;
        execute(++index);
      },
      reject(err?: any) {
        error = err;
        value = null;
        execute(++index);
      },
      response: { value, error },
    });
  };

  return {chain, execute};
};

/**
 * @description Determine type checker
 * @param type
 * @returns {*}
 */
export const determineTypeChecker = (type: any) => {
  switch (type) {
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
 * @description Iterate recursively
 * @param {(resolve: (proceed: boolean) => void, index?: number) => void} handler
 * @param {() => void} complete
 * @param {number} i
 */
export const recurIter = (handler: (resolve: (proceed: boolean) => void, index?: number) => void, complete?: () => void, i?: number) => {
  i = i || 0;
  handler((proceed) => {
    if (!proceed) {
      return complete();
    }
    recurIter(handler, complete, ++i);
  }, i);
};

/**
 * @description Poll over an interval of time
 * @param {{interval?: number}} options
 * @returns {(handler: (resolve: (proceed: boolean) => void) => void, complete: () => void) => void}
 */
export const poll = (options: {interval?: number, complete?: () => void} = {}) => {
  const interval = options.interval || 0;
  const complete = isFunc(options.complete) ? options.complete : () => true;
  return (handler: (resolve: (proceed: boolean) => void) => void) => {
    setTimeout(() => {
      handler((proceed: boolean) => {
        if (proceed) {
          return poll({interval, complete})(handler);
        }
        complete();
      });
    }, interval);
  };
};
