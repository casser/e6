export class Parent {
    name:String;
    public constructor(name:String){
       this.name = name;
    }   
    public talk(message:String){
        return this.name+' says '+message;
    }
}