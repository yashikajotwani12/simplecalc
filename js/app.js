const $input=document.querySelector("input");
document.querySelectorAll(".num__key").forEach(el=>{
    el.onclick=()=> ($input.value=$input.value!=="0" ? $input.value +el.innerText:el.innerText);

});
const buffer=[];

const opCallback=opName=>()=>{
    let currentVal=parseFloat($input.value);


    if(opName === "percent"){
        currentVal*=0.01;
        $input.value=currentVal;
    }else{
        if(buffer && buffer.length)
        {
            buffer.push({ value:currentVal});

            const result=evaluate(buffer);

            buffer.push({value:result});
            buffer.push({value:opName});

            $input.value="";
        }
        else{
            buffer.push({value:currentVal});
            buffer.push({value:opName});
            $input.value="";

        }
    }
}
const evaluate=buffer=>{
    const SecondOperand=buffer.pop().value;
    const operator=buffer.pop().value;
    const Firstoperand=buffer.pop().value;

    switch(operator){
        case"add":
        return Firstoperand + SecondOperand;
        break;
        case"substract":
        return  Firstoperand - SecondOperand;
        break;
        case"multiply":
        return  Firstoperand * SecondOperand;
        break;
        case"divide":
        return  Firstoperand / SecondOperand;
        break;
        default:
            return SecondOperand;
        
    }
};


for(const opName of ["add" , "substract","multiply","divide","percent"]){
    document.querySelector(`.op__key[op=${opName}]`)
    .onclick=opCallback(opName);
}

document.querySelector(".eq__key").onclick=()=>{
    if(buffer&&buffer.length){
        buffer.push({value:parseFloat($input.value)

        });
        $input.value= evaluate(buffer);
    }

}
document.querySelector(".op__key[op=clear]")
.onclick=()=>{
    $input.value=0;
    buffer.length=0;

};