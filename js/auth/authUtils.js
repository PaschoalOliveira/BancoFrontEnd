//Usuario e senha para acesso da api
var user = 'usuario2';
var password = 123;
function make_base_auth() {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}

function make_bearertoken_auth() {

}