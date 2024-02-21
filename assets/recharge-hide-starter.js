 document.onreadystatechange = function () {
     if (document.readyState == "complete") {

let variant2 = document.querySelector('.dys8oc0._1skx4gj0')
let children = Array.from(variant2.children)
children.forEach((x)=>{ x.innerText.includes("Starter") && variant2.removeChild(x) });

 }
 }