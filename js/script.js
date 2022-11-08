class Calculator {

    constructor(){
        this.upperValue = document.querySelector('#upper');
        this.resultValue = document.querySelector('#result');
        this.reset = 0;
    }

    clearValues(){
        this.upperValue.textContent = 0;
        this.resultValue.textContent = 0;
    }

    checkLastDigit(input, upperValue, reg){
        if((!reg.test(input) && !reg.test(upperValue.substr(upperValue.length - 1)))){
            return true;
        } else{
            return false;
        }
    }

    sum(n1, n2){
        return parseFloat(n1) + parseFloat(n2)
    }

    sub(n1, n2){
        return parseFloat(n1) - parseFloat(n2)
    }

    mult(n1, n2){
        return parseFloat(n1) * parseFloat(n2)
    }

    div(n1, n2){
        return parseFloat(n1) / parseFloat(n2)
    }

    refreshValue(total){
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    resolution(){
        // string to array

        let upperValueArray = (this.upperValue.textContent).split(" ");
        let result = 0;

        for (let i = 0; i <= upperValueArray.length; i++){

            let opperation = 0;
            let actualItem = upperValueArray[i];

            if (actualItem == "x"){
                result  = calc.mult(upperValueArray[i - 1], upperValueArray [i + 1]);
                opperation = 1;
            } else if(actualItem == "/"){
                result  = calc.div(upperValueArray[i - 1], upperValueArray [i + 1]);
                opperation = 1;
            }else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
                if (actualItem == "+"){
                    result  = calc.sum(upperValueArray[i - 1] , upperValueArray [i + 1]);
                    opperation = 1;
                }else if(actualItem == "-"){
                result  = calc.sub(upperValueArray[i - 1] , upperValueArray [i + 1]);
                opperation = 1;
                }
            }

            if (opperation){
                upperValueArray[i - 1] = result;

                upperValueArray.splice(i, 2);

                i = 0;
            }
        }

        if (result ){
            calc.reset = 1;
        }

        calc.refreshValue(result);
    }

    btnPress(){

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        // verify numebr

        var reg = new RegExp('^\\d+$');


        // reset display
        if(calc.reset && reg.test(input)){
            upperValue = "0";
        }

        calc.reset = 0;

        if (input == "AC"){
            calc.clearValues();

        }else if(input == "="){
            calc.resolution();
        }else{
            if( calc.checkLastDigit(input, upperValue, reg)){
                return false;
            }
            
            // add space
            if(!reg.test(input)){
                input = ` ${input} `
            }
    
            if (upperValue == "0"){
                if(reg.test(input)){
                calc.upperValue.textContent = input;
            }
        }else {
                calc.upperValue.textContent += input;
            }
        }

    }
}

// start object

let calc = new Calculator;

// start btns

let buttons = document.querySelectorAll('.btn');

// map all buttons
for (let i = 0; buttons.length > i ; i++){
    buttons[i].addEventListener('click', calc.btnPress);
}