let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true ;
        let inputs = form.querySelectorAll('input');
        validator.clearErros();

        for(let i=0 ;i< inputs.length ; i++){
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true){
                send = false ;
                validator.showError(input,check);
            }
        }


        if(send) {
            form.Submit();
        }
      
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required' :
                        if(input.value == ''){
                            return 'Campo não pode ser vazio'
                        }

                    break;
                     
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo deve ter ao menos ' +rDetails[1]+' caracteres';
                        }
                        
                    break;
                    
                }
            }
        }
        return true;
    },
    showError:(input , error)=>{
        input.style.borderColor="#f00"
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement,input.ElementSibling);

    },
    clearErros:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0 ; i<inputs.length;i++){
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error');

        for(let i=0;i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
    
};

let form = document.querySelector('.validator');
form.addEventListener('submit',validator.handleSubmit);