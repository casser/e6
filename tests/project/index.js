E6("test-module",function(E6){
/*/Users/Sergey/Work/EXP/e6/tests/project/src/model/parent.js*/
E6("model/parent.js",function(E6){with(this){
  E6.C("Parent",function(E6){
    E6.P(Object);
    E6.F(0,"name");
    E6.M(2,"constructor",function(name){
      this.name=name;
    });
    E6.M(2,"talk",function(message){
      return this.name+' says '+message;
    });
  });
  E6.E("Parent");
}});
/*/Users/Sergey/Work/EXP/e6/tests/project/src/model/child.js*/
E6("model/child.js",function(E6){with(this){
  E6.I('./parent');
  E6.C("Child",function(E6){
    E6.P(Object);
    E6.F(0,"name");
    E6.M(0,"constructor",function(name){
      this.name=name;
    });
    E6.M(0,"talk",function(message){
      return "Child "+this.name+"Says"+message;
    });
  });
  E6.E("Child");
}});
/*/Users/Sergey/Work/EXP/e6/tests/project/src/model/parent.js*/
E6("model/parent.js",function(E6){with(this){
  E6.C("Parent",function(E6){
    E6.P(Object);
    E6.F(0,"name");
    E6.M(2,"constructor",function(name){
      this.name=name;
    });
    E6.M(2,"talk",function(message){
      return this.name+' says '+message;
    });
  });
  E6.E("Parent");
}});
/*/Users/Sergey/Work/EXP/e6/tests/project/src/index.js*/
E6("index.js",function(E6){with(this){
  E6.I('./model/child');
  E6.I('./model/parent');
  E6.C("Main",function(E6){
    E6.P(Object);
    E6.M(1,"constructor",function(){
      new Main();
    });
    E6.M(2,"constructor",function(){
      console.info(new Child("Kitty").talk("Hello"));
      console.info(new Child("Mitty").talk("Murrr"));
      console.info(new Child("Mitty").talk("Murrr"));
      console.info(new Child("Mitty").talk("Murrr"));
      console.info(new Child("Mitty").talk("Murrr"));
    });
  });
}});
});
