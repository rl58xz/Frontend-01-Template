let element = document.body;

let contexts = new Map();

let MOUSE_SYMBOL = Symbol('mouse');

element.addEventListener('mousedown',(event)=>{
    contexts[MOUSE_SYMBOL] = Object.create(null);
    start(event,contexts[MOUSE_SYMBOL]);
    let mousemove = (event)=>{
        move(event);
    }

    let mouseend = (event) => {
        end(event);
        element.removeEventListener('mousemove',mousemove);
        element.removeEventListener('mouseup',mouseend);
    }

    element.addEventListener('mousemove',mousemove);
    element.addEventListener('mouseup',mouseend);
})

element.addEventListener('touchstart',(event)=>{
    for(let touch of event.changedTouches){
        start(touch)
    }
})

element.addEventListener('touchmove',(event)=>{
    for(let touch of event.changedTouches){
        move(touch)
    }
})

element.addEventListener('touchend',(event)=>{
    for(let touch of event.changedTouches){
        end(touch)
    }
})

element.addEventListener('touchcancel',(event)=>{
    for(let touch of event.changedTouches){
        cancel(touch)
    }
})

let start = (point,context)=>{
    console.log(point.clientX,point.clientY)
}

let move = (point,context)=>{
    console.log(point.clientX,point.clientY)
}

let end = (point,context)=>{
    console.log(point.clientX,point.clientY)
}

let cancel = (point,context)=>{
    console.log(point.clientX,point.clientY)
}