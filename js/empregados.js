let mustacheTemplate
$(window).on('load', () => {
  mustacheTemplate = document.getElementById('tableClientes').innerHTML;
  mustacheTemplatePaginacao = document.getElementById('paginacao').innerHTML;
})

function resgataEmpregados(numeroPagina){  
        
    numeroPagina--;
    var nome = $('#txtNome').val();
    var cpf = $('#txtCpf').val();
    var nomeAgencia = $('#txtNomeAgencia').val();

    var dataObj = {};

    if(nome != ""){
        dataObj = {...dataObj, ["nome"] : nome}
    }
    if(cpf != ""){
        dataObj = {...dataObj, ["cpf"] : cpf};
    }
    if(nomeAgencia != ""){
        dataObj = {...dataObj, ["nomeAgencia"] : nomeAgencia};
    }

    //console.log(dataObj);
    $.ajax
    ({
        type: "GET",
        url: "http://localhost:8090/v1/empregados?numeroPagina=" + numeroPagina,
        data:dataObj,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', make_base_auth());
        },
        success: function (data){
            console.log(data);
            var paginaAtual = data['number'];
            
            $('#tableClientes').css("visibility", "visible");
            
            //var tableHtml = document.getElementById('tableClientes').innerHTML;
            var rendered = Mustache.render(mustacheTemplate, data);
            $('#tableClientes').html(rendered);
            
            var totalPages = data['totalPages'];
            var listaNumeros = [];
            for(x=0; x< totalPages; x++){
                listaNumeros[x] = {
                    "numero":x + 1
                };
            }
            var obj = {
                paginas:listaNumeros
            }

            //console.log(paginas);
            console.log(obj);

            var rendered = Mustache.render(mustacheTemplatePaginacao, obj);
            $('#paginacao').html(rendered);
        }
    });
}