parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"A2T1":[function(require,module,exports) {
"use strict";var e=r(require("inquirer")),o=r(require("download-git-repo")),t=r(require("child_process")),n=r(require("cli-spinner"));function r(e){return e&&e.__esModule?e:{default:e}}const s=n.default.Spinner;let a=process.argv[2]||null;const l={dom:"DOM",node:"Node.js",nodeReactApi:"Node-React-API"},i=[{type:"list",message:"Select project boilerplate",name:"project",choices:[{name:"DOM"},{name:"Node.js"},{name:"Node-React-Api"}]}];let c;function d(e){c=`./${a}`;let t="webdevenv/";"dom"===e&&(t+=l.dom),"node.js"===e&&(t+=l.node),"node-react-api"===e&&(t+=l.nodeReactApi),console.log("started download"),(0,o.default)(t,c,e=>{e&&console.error(e),console.log("finished download"),m()})}a||i.unshift({type:"input",name:"projectName",message:"Select project name",validate:e=>e.match(" ")&&e?"Invalid name":(a=e,!0)}),e.default.prompt(i).then(e=>d(e.project.toLowerCase()));const p=new s({text:"Installing project",stream:process.stderr,onTick(e){this.clearLine(this.stream),this.stream.write(e)}});function m(){console.clear(),p.start(),t.default.exec("npm i",{cwd:c},()=>{p.stop(1),console.log("Installation finished!\n"),console.log("Go into the project folder and run:"),console.log('"npm start help"')})}p.setSpinnerString(0);
},{}]},{},["A2T1"], null)