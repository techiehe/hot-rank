import {Solar} from 'lunar-typescript';

const solar = Solar.fromYmd(1986, 5, 29);
console.log(solar.toFullString());
console.log(solar.getLunar().toFullString());