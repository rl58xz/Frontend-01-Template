// import './foo'
function create(Cls,arttributes,...children){
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

    console.log(children)

    for(let child of children){
        if(typeof child === "string"){
            child = new Text(child);
        }
        o.appendchild(child);
    }

    return o;
}

class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendchild(this.root);
    }
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
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
    appendchild(child){
        this.children.push(child);
    }
}

class MyComponent{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
    }

    setAttribute(name,value){
        this.attributes.set(name,value);
    }

    mountTo(parent){
        this.slot = <div></div>

        for(let child of this.children){
            this.slot.appendchild(child);
        }

        this.render().mountTo(parent);
    }

    appendchild(child){
        this.children.push(child);
    }

    render(){
        return <article>
            <h1>{this.attributes.get("title")}</h1>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a header</footer>
        </article>
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

// var component = create(Div,{
//     id: "a",
//     "class":"b",
// },create(Div,null))

let component = <MyComponent>

</MyComponent>

component.mountTo(document)
console.log(component)