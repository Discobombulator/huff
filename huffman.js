function func(freq, letter, used, code, leftson, rightson) {
    this.freq = freq; 
    this.letter = letter;
    this.used = used;
    this.code = code;
    this.leftson = leftson;
    this.rightson = rightson
  }
  
  let str= 'abrecadabra';
  let huff = new Array();
  
  let mass = new Object();
  
  for (i = 0; i < str.length; i++) {
    if (mass[str.charAt(i)])
    mass[str.charAt(i)] ++;
  else 
   mass[str.charAt(i)] = 1
  }
  
  for (let i in mass){
    let n = new func(mass[i], i, 0, "0", -1, -1);
    huff.push(n) 
  }

function pair(freq, iter){
  this.freq = freq;
  this.iter = iter;
}

  let a = new pair(str.length + 1, -1)
  let b = new pair(str.length + 1, -1)
  let size = huff.length;
  
  for (let i = 0; i < huff.length; i++) {   
      if (huff[i].freq <= a.freq){            
         b.freq = a.freq;
         b.iter = a.iter;
         a.freq = huff[i].freq;
         a.iter = i;
      }
      else if (huff[i].freq < b.freq && huff[i].freq >= a.freq) {
        b.freq = huff[i].freq;
        b.iter = i;
      } 
  }
  let n = new func( huff[a.iter].freq + huff[b.iter].freq,  huff[a.iter].letter + huff[b.iter].letter,  0,  "1",  a.iter,  b.iter);
  huff.push(n)
  huff[a.iter].used = 1;
  huff[b.iter].used = 1;
  huff[a.iter].code = "0";
  huff[b.iter].code = "1";
  a.freq = str.length + 1;                     
  
  let count = 2;
  const size2 = huff.length - 1;
  while(count < size2){                         
    for (let i = 0; i < size; i++){                        
      if (huff[i].used == 0 && a.freq >= huff[i].freq){
        a.freq = huff[i].freq;
        a.iter = i;
      }
    }
    let n = new func( huff[a.iter].freq + huff[huff.length-1].freq ,  huff[a.iter].letter + huff[huff.length-1].letter,  0, "1",  a.iter,  huff.length-1)
    huff.push(n)
    huff[a.iter].used = 1;
    a.freq = str.length + 1;
    count += 1;
  }
  
  huff[huff.length - 1].code = "";            
  
  for (let i = huff.length - 1; i >= size; i--){               
    if (huff[i].lson !=-1)
      huff[huff[i].leftson].code = huff[i].code + huff[huff[i].leftson].code;
    if (huff[i].rson !=-1)
      huff[huff[i].rightson].code = huff[i].code + huff[huff[i].rightson].code;
  }
  let res="";
  for (let i=0; i<str.length; i++){                           
    for (let j=0;j<size;j++){
      if (huff[j].letter==str[i]){
        res+=huff[j].code;
        break;
      }
    }
  }
  console.log(res);