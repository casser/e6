import * from './model/child';
import * from './model/parent';

class Main {
    static constructor(){
        new Main();
    }
    public constructor(){
        console.info(new Child("Kitty").talk("Hello"));
        console.info(new Child("Mitty").talk("Murrr"));
        console.info(new Child("Mitty").talk("Murrr"));
        console.info(new Child("Mitty").talk("Murrr"));
        console.info(new Child("Mitty").talk("Murrr"));
    }
}
