import Minibase from "./minibase-sdk.js";
import { getAttributes, getBC, getTags } from "./offline.js";
//import data from './offline-data.json'


let appName = import.meta.env.VITE_MB_APPNAME
let apiKey = import.meta.env.VITE_MB_APIKEY

let options = {
    mode: 'online',
 //   data
}
const minibase = new Minibase(appName, apiKey, options)

//console.log(data.map(getTags).flat(2))

//if(options.mode !== 'online') {

 //   await minibase.insert('tags', data.map(getTags).flat(2));
 //   await minibase.insert('attributes', data.map(getAttributes).flat(2));
 //   await minibase.insert('bc', data.map(getBC).flat(2));   
//}

// console.log((await minibase.get('tags')).length)

export default minibase;
