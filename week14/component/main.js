// import './foo'
function create(Cls,arttributes,...children){
    let o;
    if(typeof Cls === "string"){
        o = new Wrapper(Cls);
    }else {
        o = new Cls;
    }
    for(let name in arttributes){
        o.setAttribute(name,arttributes[name]);
    }

    console.log(children)

    for(let child of children){
        o.appendchild(child);
    }

    return o;
}

class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }

    mountTo(parent){
        parent.appendchild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
    appendchild(child){
        this.children.push(child);
    }
}
class Div{
    constructor(){
        this.children = [];
        this.root = document.createElement("div");
    }

    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }

    mountTo(parent){
        parent.appendchild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
    appendchild(child){
        this.children.push(child);
    }
}

// class Child{
//     constructor(){
//         this.children = [];
//         this.root = document.createElement("div");
//     }

//     setAttribute(name,value){
//         this.root.setAttribute(name,value);
//     }

//     mountTo(parent){
//         parent.appendchild(this.root)
//     }
//     appendchild(child){
//         child.mountTo(this.root)
//     }
// }

// let component = <Parent id = "a" class = "b"></Parent>

var component = create(Div,{
    id: "a",
    "class":"b",
},create(Div,null))

component.mountTo(document)
console.log(component)