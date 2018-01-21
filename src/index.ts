import * as ammo from './libs/ammo/ammo';

const obj = {
  name: 'testABC',
  funcA() {
    console.log('AAA');
  },
  funcB() {
    console.log('BBB');
  },
  funcC() {
    console.log('CCC');
  },
};

ammo.eachKey(obj, (key: string, prop: any) => {
  console.log(key, prop);
});

console.log(ammo.parseToType('52.32'));

let counter = 0;

ammo.poll({interval: 500})((proceed) => {
  counter++;
  console.log('poll');
  proceed(true);
});
