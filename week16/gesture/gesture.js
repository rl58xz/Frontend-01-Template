let element = document.body;

element.addEventListener('mousedown',(event)=>{
    start(event);
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

let start = (point)=>{
    console.log(point.clientX,point.clientY)
}

let move = (point)=>{
    console.log(point.clientX,point.clientY)
}

let end = (point)=>{
    console.log(point.clientX,point.clientY)
}

let cancel = (point)=>{
    console.log(point.clientX,point.clientY)
}