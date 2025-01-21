document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form-sorteador');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAletorio = Math.random() * numeroMaximo;
        numeroAletorio = Math.floor(numeroAletorio + 1);

        document.getElementById('resultado-valor').innerText = numeroAletorio;
    })
})