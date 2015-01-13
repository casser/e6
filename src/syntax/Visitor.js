export class Visitor {
    visit(node:Node){
        console.info(node.name);
        if(node.children && node.children.length){
            for(var child of node.children){
                this.visit(child)
            }
        }

    }
}