//Usuario e senha para acesso da api
var user = 'moises';
var password = 12345;
//Método responsável por geraro cabeçalho com o http basic
function make_base_auth() {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}

function make_bearertoken_auth() {

}