let lastOperand = 0;
let operation = null;

const inputWindow = document.getElementById('inputWindow');


document.getElementById('btn_clr').addEventListener('click', function () {
    lastOperand = 0;
    operation = null;
    inputWindow.value = '';
})

document.querySelectorAll('.number').forEach(function (num){
    num.addEventListener('click', function (){
        //console.log(this);
        inputWindow.value += this.innerText;
    })
});

document.querySelectorAll('.operator').forEach(function (operator){
    operator.addEventListener('click', function (e){
        //console.log(e.target.id)
        let res;
        switch (e.target.id) {
            case 'btn_calc':
                if (operation === 'btn_plus')
                    res = lastOperand + parseInt(inputWindow.value);
                if (operation === 'btn_minus')
                    res = lastOperand - parseInt(inputWindow.value);
                if (operation === 'btn_multiply')
                    res = lastOperand * parseInt(inputWindow.value);
                if (operation === 'btn_divide')
                    res = lastOperand / parseInt(inputWindow.value);
                if (operation === 'btn_sqrt')
                    res = Math.sqrt(lastOperand);
                inputWindow.value = res;
                operation = null;
                lastOperand = 0;
                break;

            case 'btn_sqrt':
                lastOperand = parseInt(inputWindow.value);
                res = Math.sqrt(parseInt(lastOperand));
                inputWindow.value = res;
                operation = null;
                break;
            case 'btn_divide':
            case 'btn_multiply':
            case 'btn_plus':
            case 'btn_minus':
                if (operation !== null) {
                    document.getElementById('btn_calc').click();
                }
                lastOperand = parseInt(inputWindow.value);
                operation = e.target.id;
                inputWindow.value = '';
                break;
        }
    });
});