export default class Lde {

  constructor(){
      this.arrayLDE = [];
      this.size = 0;
      this.first = null;
      this.last = null;
  }

  insert(value){
      let tmpArray = this.arrayLDE.concat(value)
      console.warn(tmpArray);
      for(let i = 0 ; i < tmpArray.length-1; i++){
          for(let j = i; j < tmpArray.length-1; j++){
              if(tmpArray[j] > tmpArray[j+1]){
                  let temp = tmpArray[j];
          tmpArray[j] = tmpArray[j + 1]
          tmpArray[j + 1] = temp
              }
          }
      }
      this.arrayLDE = tmpArray;
      console.warn("insere: ", this.arrayLDE)
      this.size++;
      this.print();
      return true;
  }

  remove(value){
      for (let i = 0; i < this.arrayLDE.length; i++) {
          if(value == this.arrayLDE[i]){
              this.arrayLDE.splice(i,1);
              return true;
          }
      }
      return false ;
  }

  search(value){
      for (let i = 0; i < this.arrayLDE.length-1; i++) {
          if(this.arrayLDE[i] == value){
              return true;
          }            
      }
      return false;
  }
  
  print(){
      console.warn(this.arrayLDE)
  }
  getSize(){
      return this.size;
  }
}