const EOF = Symbol("EOF");
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{
    type:"document",
    children:[]
}];

function emit(token){
    let top = stack[stack.length-1];
    if(token.type == "startTag"){

        let element = {
            type:"element",
            tagName:"",
            children:[],
            attributes:[]
        }

        element.tagName = token.tagName;

        for(let key in token){
            if(key !== "type" && key !== "tagName"){
                element.attributes.push({
                    name:key,
                    value:token[key]
                })
            }
        }

        top.children.push(element);

        //element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element);
        }

        currentTextNode = null;
    }else if(token.type == "endTag"){
        if(token.tagName != top.tagName){
            throw new Error("aaa");
        }else {
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        if(currentTextNode === null){
            currentTextNode = {
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode += token.content;
    }
}

function data(c){
    if(c == "<"){
        return tagOpen;
    }else if( c == EOF){
        emit({
            type: "EOF"
        });
        return ;
    }else{
        emit({
            type:"text",
            content:c
        });
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "startTag",
            tagName : ""
        }
        return tagName(c);
    }else {
        emit({
            type:"text",
            content:c
        });
        return;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "endTag",
            tagName : ""
        }
        return tagName(c);
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else {

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
       return beforeAttributeName;
    }else if(c == "/"){
       return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else{
        currentToken.tagName += c;
        return tagName;
    }
}

function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }else if(c == "EOF"){return;}
    else{return data}
}

//not same
function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeName;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentAttribute = {
            name:"",
            value : ""
        }
        return AttributeName(c);
    }else return beforeAttributeName;
}

function AttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentAttribute.name += c;
        return AttributeName;
    }else if(c == "="){
        return beforeAttributeValue;
    }else{
        return AttributeName;
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else{
        return beforeAttributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQutAttributeValue;
    }else if(c == "\'"){
        return singleQutAttributeValue;
    }else if(c.match(/^[a-zA-Z]$/)){
        return unQutAttributeValue(c);
    }else return beforeAttributeValue;
}

function doubleQutAttributeValue(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentAttribute.value += c;
        return doubleQutAttributeValue;
    }else if(c == "\""){
        return AfterAttributeValue;
    }else return;
}

function singleQutAttributeValue(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentAttribute.value += c;
        return singleQutAttributeValue;
    }else if(c == "\'"){
        return AfterAttributeValue;
    }else return;
}

function unQutAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentAttribute.value += c;
        return unQutAttributeValue;
    }else{
        return beforeAttributeName;
    }
}

function AfterAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return data;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else return beforeAttributeName;
}

module.exports.parseHTML = function parseHTML(html){
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
    console.log(JSON.stringify(stack));
    return stack[0];
}