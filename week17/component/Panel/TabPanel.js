import { create, Wrapper, Text } from '../createElement';
import {TimeLine,Animation} from '../animation';
import {ease} from '../cubicBezier';
import { enableGesture } from '../gesture';

export class TabPanel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null)
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    getAttribute(name) { //attribute
        return this[name];
    }

    appendChild(child) {
        this.children.push(child);
    }

    select(i){
        for(let view of this.childViews){
            view.style.display = 'none';
        }
        this.childViews[i].style.display = '';

        for(let view of this.titleViews){
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
        // this.titleView.innerText = this.childViews[i].title;
    }

    render() {
        this.childViews = this.children.map(child => <div style="width:300px;min-height:300px;margin:0">{child}</div>);
        this.titleViews = this.children.map((child,i) => <span onClick={() => this.select(i)} 
        style="background-color:lightgreen; margin:5px 5px 0px 5px;font-size:20px; width:300px;">{child.getAttribute("title") || ''}</span>);
        setTimeout(()=>this.select(0),16);
        return <div class="tabpanel" style="width:300px">
            <h1 style=" width:300px; margin:0;">{this.titleViews}</h1>
            <div style="border:solid 1px lightgreen;">{this.childViews}</div>
        </div>
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}
