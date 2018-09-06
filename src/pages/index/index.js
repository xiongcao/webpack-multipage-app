import vars from '../../common/js/publicPath.js';
import './index.css';
console.log(document.getElementById("home"));
document.getElementById("home").innerHTML = "我把你给替换掉了aa";

let test = ()=>{
    let arr = [1,2,3,4];
    arr.forEach((o)=>{
        console.log(o);
    }); 
}