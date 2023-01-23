//Contacto mediante libreria 

(async () => {
    const { value: correo } = await Swal.fire({
        title: 'Ingrese su Correo',
        text: 'Para que un vendedor se contacte con usted',
        confirmButtonText: 'Enviar',
        input: 'email',
        inputPlaceholder: 'Correo',
        position: 'bottom',
    })


    if (correo) {
        Swal.fire({
            title: 'Correo Recibido',
            text: 'Un vendedor se contactara con usted a la brevedad',
        })
    }
})()



