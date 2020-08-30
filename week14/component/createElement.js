export function create(Cls,arttributes,...children){
    let o;

    if(typeof Cls === "string"){
        o = new Wrapper(Cls);
    }else {
        o = new Cls({
            timer:{}
        });
    }

    for(let name in arttributes){
        o.setAttribute(name,arttributes[name]);
    }

    let visit = (children)=>{
        
        for(let child of children){
            if(typeof child === "object" && child instanceof Array){
                visit(child);
                continue;
            }
            if(typeof child === "string"){
                child = new Text(child);
            }
            o.appendchild(child);
        }
    }

    visit(children);

    return o;
}

export class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendchild(this.root);
    }
}

export class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    
    addEventListener(){
        this.root = addEventListener(...arguments);
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