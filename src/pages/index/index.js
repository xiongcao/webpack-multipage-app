import vars from '@js/publicPath.js';
import '@js/public.js';
import './index.css';
import './index.scss';
console.log(document.getElementById("home"));
document.getElementById("home").innerHTML = "我把你给替换掉了aa啊";

let test = ()=>{
    let arr = [1,2,3,4];
    arr.forEach((o)=>{
        console.log(o);
    }); 
}