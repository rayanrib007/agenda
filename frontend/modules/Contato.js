import validator from 'validator';

export default class Contato{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init(){
        this.events();
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validator(e)
        })
    }
    validator(e){
        const el = e.target;
        const nome = el.querySelector('input[name="nome"]').value;
        const email = el.querySelector('input[name="email"]').value;
        let error = false;
        if(!nome){
            alert('O campo "Nome" é obrigatório');
            error = true;
        }
        if(!validator.isEmail(email)){
            alert('O campo "Email" é inválido');
            error = true;
        }
        if(!error) el.submit();
    }
}