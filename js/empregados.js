function resgataEmpregados(){                   
    $.ajax
    ({
        type: "GET",
        url: "http://localhost:8090/v1/empregados",
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', make_base_auth());
        },
        success: function (data){
            $.each(data, function (key, item) {
                console.log(item);                        
                $('#tableClientes').append('<tr><td>' + item.cpf + '</td> <td>' + 
                                                        item.nome + '</td> <td>' + 
                                                        item.agenciaNome + '</td> <td>' + 
                                                        item.nomeInstituicao + '</td> </tr>'
                                        );
                
            }); 
        }
    });
}