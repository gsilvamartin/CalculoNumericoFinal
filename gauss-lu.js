function gerarMatriz() {
  var table = "";
  var matrizFinal = [];
  var numero = parseInt($("#gauss-dimension").val());

  if (numero == 0 || numero == null || numero == undefined) {
    alert("Digite um valor maior que zero.");
    return;
  }

  for (var i = 0; i <= numero + 1; i++) {
    matrizFinal.push(new Array(numero + 1));
  }

  for (var i = 1; i < matrizFinal.length - 1; i++) {
    if (i === 1) {
      table += "<table id='gauss' style='width:100%' class='table'><tr>";

      for (var j = 1; j < matrizFinal.length; j++) {
        if (j === matrizFinal.length - 1) {
          table += "<td>b<td></tr>";
        } else {
          table += "<td>x" + j + "</td>";
        }
      }
    }

    table += "<tr>";

    for (var j = 1; j < matrizFinal.length; j++) {
      table += "<td><input class='input-number form-control'></td>";
    }

    table += "</tr>";
  }

  table +=
    "</table><br><button class='btn btn-primary' onclick='calculaGauss()'>Calcular</button>";

  $("#gauss-table").html("");
  $("#gauss-table").append(table);
}

function calculaGauss() {
  var arrayB = [];
  var finalArray = [];
  var table = document.getElementById("gauss").querySelectorAll("#gauss tr");

  table.forEach((element) => {
    line = [];
    inputs = element.querySelectorAll("input");
    inputs.forEach((element) => {
      line.push(element.value);
    });

    line.pop();
    finalArray.push(line);
  });

  finalArray.shift();

  EfetuaCalculosLU(finalArray);
}

function EfetuaCalculosLU(matA) {
  var resultado = math.lup(matA);

  var resultadoL = "";
  var resultadoLU = "";
  var resultadoP = "";

  for (var i = 0; i < resultado.L.length; i++) {
    for (var j = 0; j < resultado.L.length; j++) {
      if (j === 0) {
        resultadoL += resultado.L[i][j];
      } else {
        resultadoL += " & " + resultado.L[i][j];
      }
    }

    if (i !== resultado.L.length - 1) resultadoL += "\\\\";
  }

  for (var i = 0; i < resultado.U.length; i++) {
    for (var j = 0; j < resultado.U.length; j++) {
      if (j === 0) {
        resultadoLU += resultado.U[i][j];
      } else {
        resultadoLU += " & " + resultado.U[i][j];
      }
    }

    if (i !== resultado.U.length - 1) resultadoLU += "\\\\";
  }

  for (var i = 0; i < resultado.p.length; i++) {
    if (i === 0) {
      resultadoP += resultado.p[i];
    } else {
      resultadoP += " & " + resultado.p[i];
    }
  }

  $("#l-l").append("L = \\begin{pmatrix}" + resultadoL + " \\end{pmatrix}");
  $("#l-p").append("P = \\begin{pmatrix}" + resultadoP + " \\end{pmatrix}");
  $("#l-lu").append("LU = \\begin{pmatrix}" + resultadoLU + " \\end{pmatrix}");

  $("#resultado-lu").show();
  MathJax.typeset();
}
