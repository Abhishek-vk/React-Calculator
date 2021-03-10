import React from 'react';
import Backspace from '@material-ui/icons/BackspaceOutlined';
import {FaCircle} from 'react-icons/fa';
import './App.css'

let first='0',
  second='0',
  operator='+',
  equale=false,
  sym=false,
  expFirst=true,
  dot=false;

let clearC=()=> {
  second='0';
  if(equale)
    first='0';
  document.getElementById("num").value=first; 
  document.getElementById("exp").value=first; 
  equale=true;
  operator='';
  dot=false;
}
let clearAC=()=> {
  first='0';
  second='0';
  operator='+';
  document.getElementById("num").value=first;
  document.getElementById("exp").value=first;
  dot=false;
}
let clearBS=()=> {
  if(!Number.isInteger(parseInt(first)))
    return;
  var x=document.getElementById('num').value;
  var y=document.getElementById("exp").value;
  if(second!=x && !equale){
    document.getElementById('num').value='0';
    return;
  }
  if(x.length==1){
    x='0';
    y=y.slice(0,y.length-1);
    y=y+'0';
    document.getElementById('num').value=x;
    document.getElementById('exp').value=y;
    second=x;
    return;
  }
  x=x.slice(0,x.length-1);
  y=y.slice(0,y.length-1);
  document.getElementById('num').value=x;
  document.getElementById('exp').value=y;
  second=x;
  if(x.indexOf('.')==-1)
    dot=false;
}

let decimal=()=>{
  if(!Number.isInteger(parseInt(first)) || dot)
    return;
  else if(sym){
    document.getElementById("num").value='0';
    sym=false;
  }
  if(equale){
    document.getElementById("num").value='0.';
    document.getElementById('exp').value='0.';
    second='0.';
    dot=true;
    equale=false;
    return;
  }
  document.getElementById("num").value+='.';
  second=document.getElementById("num").value;
  document.getElementById('exp').value+='.';
  dot=!dot;
}

function view(n){
  if(!Number.isInteger(parseInt(first)))
    return;
  else if(equale){
    document.getElementById("num").value='0';
    document.getElementById('exp').value='0';
    first='0';
    second='0';
    equale=false;
    sym=false;
  }
  else if(sym){
    document.getElementById("num").value='0';
    sym=false;
  }
  var a=document.getElementById("num").value;
  var b=document.getElementById('exp').value;
  if(a==='0'){
    a=n;
    b=b.slice(0,b.length-1);
    b=b+n;
  }
  else{
    a+=n;
    b+=n;
  }
  document.getElementById("num").value=a;
  document.getElementById('exp').value=b;
  second=a;
}

function operate(n){
  if(!Number.isInteger(parseInt(first)))
    return;
  /*if(n==='%'){
    var x=document.getElementById('num').value;
    var y=document.getElementById('exp').value;
    var loc=y.lastIndexOf(x);
    y=y.slice(0,loc);
    x=(parseFloat(x)/100).toString();
    y+=x;
    document.getElementById('num').value=x;
    document.getElementById('exp').value=y;
    second=x;
    return;
  }*/
  if(expFirst){
    document.getElementById('exp').value=`${second} ${n} ${first}`;
    expFirst=!expFirst;
  }
  if(operator==='+'){
    first=(parseFloat(first)+parseFloat(second)).toString();
  }
  else if(operator==='-')
    first=(parseFloat(first)-parseFloat(second)).toString();
  else if(operator==='*')
    first=(parseFloat(first)*parseFloat(second)).toString();
  else if(operator==='/')
    first=(parseFloat(first)/parseFloat(second)).toString();
  else
    first=document.getElementById('num').value;
  operator=n;
  second='0';
  if(!expFirst)
    document.getElementById('exp').value=`${first} ${n} ${second}`;
  sym=true;
  equale=false;
  dot=false;
  document.getElementById("num").value=first;
}

let result=()=> {
  operate('');
  document.getElementById("num").value=first;
  document.getElementById('exp').value=first;
  equale=true;
}

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="display-box">
          <div className="input-group">
            <div className="input-group-prepend">
              <span id="ans" className="input-group-text">Ans :</span>
            </div>
            <input type="text" id="num" value='0' autoComplete='off' className="valueBox px-2" readOnly/>
          </div>
          <input type="text" id='exp' value='0' autoComplete='off' className="expressBox" readOnly/>
        </div>
        <div className="buttons mt-4">
          <div id="numbers">
            <button onClick={()=>view("1")} className="nums btn btn-light"> 1 </button>
            <button onClick={()=>view("2")} className="nums btn btn-light"> 2 </button>
            <button onClick={()=>view("3")} className="nums btn btn-light"> 3 </button><br/>
            <button onClick={()=>view("4")} className="nums btn btn-light"> 4 </button>
            <button onClick={()=>view("5")} className="nums btn btn-light"> 5 </button>
            <button onClick={()=>view("6")} className="nums btn btn-light"> 6 </button><br/>
            <button onClick={()=>view("7")} className="nums btn btn-light"> 7 </button>
            <button onClick={()=>view("8")} className="nums btn btn-light"> 8 </button>
            <button onClick={()=>view("9")} className="nums btn btn-light"> 9 </button><br/>
          </div>
          <div id="symbols">
            <button onClick={()=>operate('+')} className="syms btn btn-outline-info"> + </button>
            <button onClick={()=>operate('-')} className="syms btn btn-outline-info"> - </button>
          </div>
          <div id="clears">
            <button onClick={clearBS} className="clears btn btn-outline-danger"> 
              <Backspace style={{fontSize:19}}/> 
            </button>
            <button onClick={clearC} className="clears btn btn-outline-danger"> 
              <span style={{fontSize:17, fontWeight:600}}>C</span> 
            </button>
            <button onClick={clearAC} className="clears btn btn-outline-danger"> 
              <span style={{fontSize:15, fontWeight:600}}>AC</span> 
            </button>
          </div>
          <div id="zeros">
            <button onClick={()=>operate('*')} className="zeros btn btn-outline-info"> * </button>
            <button onClick={()=>view("0")} className="nums btn btn-light"> 0 </button>
            <button onClick={()=>operate('/')} className="zeros btn btn-outline-info"> / </button>
            <button onClick={decimal} className="py-3 mx-2 btn btn-outline-info"> 
              <FaCircle style={{fontSize:"5px", margin:'0 5px'}}/> 
            </button>
            <button onClick={result} className="font-weight-bold zeros btn btn-outline-danger"> = </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
