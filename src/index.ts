import * as $ from 'jquery';
import 'kendo-ui-core';
import {render} from './components/renderer/';

const html = `<p>Hey there, maaan!</p>`;
render(html, document.querySelector('body'));

console.log(kendo);
console.log('!!!');
console.log($.ajax);
