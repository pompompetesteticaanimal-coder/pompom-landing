import assert from 'node:assert/strict';
import {christmasCountdown} from '../previews/natal/abertura/alternativas/contador.mjs';
for(const [date,days,year] of [
 [[2026,10,4],51,2026],[[2026,11,24],1,2026],[[2026,11,25],0,2026],[[2026,11,26],364,2027],[[2027,0,1],358,2027],[[2028,1,28],301,2028]
])for(const hour of [0,12,23])assert.deepEqual(christmasCountdown(new Date(...date,hour,59)),{days,year});
console.log('PASS: calendar days, Christmas eve/day, next Christmas, leap year and local hours.');
