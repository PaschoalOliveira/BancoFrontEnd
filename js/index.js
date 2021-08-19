function autorizar(){
        var formData = new FormData()
        formData.append('login', "moises");
        formData.append('senha', 12345);

        var dataObj = {};

        dataObj = {...dataObj, ["login"] : "moises"}
        dataObj = {...dataObj, ["senha"] : 12345};
        $.ajax
        ({
                type: "POST",
                url: "http://localhost:7090/api/usuariosApi/auth",
                data:JSON.stringify(dataObj),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data){
                        
                },
                error: function (request, status, error) {
                        alert("Problema na autenticação");
                    }
        });
}

function btnEntrar(){
        var usuario = {
                login: $("#login").val(),
                senha:$("#password").val()
            }
        //Requisição para a API
        $.ajax
        ({
                type: "GET",
                url: "http://localhost:8090/v1/usuarios/loginSenha",
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (request) {
                        //Constroi o acesso para a API
                        request.setRequestHeader('Authorization', make_base_auth());
                        //Parâmetros passados para verificar se o usuário do sistema tem acesso
                        request.setRequestHeader('login', usuario.login);
                        request.setRequestHeader('senha', usuario.senha);
                },
                success: function (data){
                        autorizar();
                        window.location.href = './menu.html';
                },
                error: function (request, status, error) {
                        alert("Usuário ou senha inválidos");
                    }
        });
}   