window.onload = function () {
    const btnRegister = document.getElementById("btnRegister");
    btnRegister.addEventListener("click", function () {
        new Swal({
            title: "Inscrição na Web Conference",
            html:
                '<input id="txtName" class="swal2-input" placeholder="name">' +
                '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
            showCancelButtonText: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById('txtName').value;
                const email = document.getElementById('txtEmail').value;
                const url_base = "https://fcawebbook.herokuapp.com";

                return fetch(`${url_base}/conferences/1/participants/${email}`, {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: "POST",
                    body: `nomeparticipant=${name}`
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(`Pedido falhou: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
            if (result.value) {
                if (!result.value.err_code) {
                    Swal({title: "Inscrição feita com sucesso!"});
                } else {
                    Swal({title: `${result.value.err_message}`});
                }
            }
        });
    });
};
