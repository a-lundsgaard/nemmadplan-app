/*const $ = (selector) =>  {
  const nodeList = Array.from(document.querySelectorAll(selector));
  return nodeList.length === 1 ? nodeList[0] : nodeList;
};*/

Array.prototype.text = function () { return this.map(el=> el.innerText).join(' ')};
//Object.prototype.text = function () { return this.innerText || null};