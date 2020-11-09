function gerarMatriz(numero) {
  var table = "";
  var matrizFinal = [];

  for (var i = 0; i <= numero + 1; i++) {
    matrizFinal.push(new Array(numero + 1));
  }

  for (var i = 0; i < matrizFinal.length; i++) {
    if (i === 0) {
      table += "<table style='width:100%' class='table'><tr>";

      for (var j = 0; j < matrizFinal.length; j++) {
        if (j === matrizFinal.length - 1) {
          table += "<td>b<td></tr>";
        } else {
          table += "<td>x" + j + "</td>";
        }
      }
    }

    table += "<tr>";

    for (var j = 0; j < matrizFinal.length; j++) {
        table += "<td><input class='input-number form-control'></td>";
    }

    table += "</tr>";
  }

  table += "</table>";

  $("#gauss-table").append(table);
}
