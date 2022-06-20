import fs from 'fs';

const dataSTR = fs.readFileSync('./data_v3.json', 'utf-8');
const data = JSON.parse(dataSTR);


const offlineDataSTR = fs.readFileSync('./src/lib/offline-data.json', 'utf-8');
const offlineData = JSON.parse(offlineDataSTR);

// deprecated: d.BrowserCompatibility[d.tag].status.depracated,
// experimental: d.BrowserCompatibility[d.tag].status.experimental,
// standard_track: d.BrowserCompatibility[d.tag].status.standard_track
import {getAttributes, getBC} from './src/lib/offline.js'

import Minibase from './src/lib/minibase-sdk.js';
import fetch from 'node-fetch';

const VITE_MB_APPNAME = 'html';
const VITE_MB_APIKEY = '05eIVHILUZS3v8Fe8z2ub7rpR0npKfQQ';

const minibase = new Minibase(VITE_MB_APPNAME, VITE_MB_APIKEY, { mode: 'online' });


await minibase.insert('bc', offlineData.map(getBC).flat(2))


// console.log(offlineData.map(getBC).flat(2).length)
// console.log(data.bc.length /2)

// await minibase.insert('bc', offlineData.map())
// await minibase.insert('tags', d);
// const attrs = await minibase.get('attributes')
// console.log(Array.isArray(data.attributes), typeof data.attributes)
// const bc = data.bc.slice(0, data.bc.length - offlineData.map(getBC).flat(2).length);
// console.log(bc.length)

// const newAttrs = data.m.

// await minibase.insert('bc', bc)
// await minibase.insert('attributes', attrs);
// await minibase.insert('bc', data.map(getBC).flat(2));

// console.log(await minibase.get('tags'));
