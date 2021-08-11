$(document).ready(function () {
   
  });

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
            console.log(data);
            var paginaAtual = data['number'];
            var totalPages = data['totalPages'];
            
            $('#tableClientes').css("visibility", "visible");
            
            var tableHtml = document.getElementById('tableClientes').innerHTML;
            var rendered = Mustache.render(tableHtml, data);
            $('#tableClientes').html(rendered);
            
            //$('#tableClientes').DataTable();
            /*
            $.each(data['content'], function (key, item) {             
                $('#tableClientes').append('<tr><td>' + item.cpf + '</td> <td>' + 
                                                        item.nome + '</td> <td>' + 
                                                        item.nomeAgencia + '</td> <td>' + 
                                                        item.nomeInstituicao + '</td> </tr>'
                );
            });
            */ 
        }
    });
}