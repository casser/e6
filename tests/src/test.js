for(var i in hello){
    while(i){
        with(i) i.call({hello:'World'});
    }
}
