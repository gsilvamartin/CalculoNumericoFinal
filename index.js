function selecionaFuncao(funcao) {
  if (funcao === 1) {
    $(".gauss-lu").show();
    $("#div-botoes").hide();
  } else if (funcao === 2) {
    $(".jacobi").show();
    $("#div-botoes").hide();
  }
}
