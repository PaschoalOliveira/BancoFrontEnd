

function carregaEmpregado(){
    var urlParams = new URLSearchParams(window.location.search);
    var cpf = urlParams.get('cpf');

    if(cpf != null){

        $.ajax
        ({
            type: "GET",
            url: "http://localhost:8090/v1/empregados/" + cpf,
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', make_base_auth());
            },
            success: function (data){
                console.log(data);
                $("#txtNome").val(data.nome);
                $("#txtCpf").val(data.cpf);

                var imagem = data.foto;
                var arrayBufferView = new Uint8Array(imagem);                                       
                var blob = new Blob( [ arrayBufferView ], { type: "image/jpg" } );
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );                                  
                var img = document.querySelector("#imagemFoto");
                img.src = imageUrl;
            }
        });
    }
}

function salvaEmpregado(){  
        
    var nome = $('#txtNome').val();
    var cpf = $('#txtCpf').val();

    var formData = new FormData()

    if(nome != ""){
        formData.append('nome', nome);
    }
    if(cpf != ""){
        formData.append('cpf', cpf);
    }
    var foto = $('#foto');
    console.log(foto);
    var blobFile = foto[0].files[0]
   
    formData.append('foto', blobFile);

    //console.log(dataObj);
    $.ajax
    ({
        type: "POST",
        url: "http://localhost:8090/v1/empregados",
        enctype: 'multipart/form-data',
        data:formData,        
        processData: false,
        contentType: false,
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', make_base_auth());
        },
        success: function (data){
            alert('Dados salvos com sucesso!')
        }
    });
}