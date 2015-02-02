import * from './parent';

export class Child{
    name:String;
    constructor(name:String){
        this.name = name;
    }
    talk(message:String){
        return "Child "+this.name+"Says"+message;
    }
}