function gerarMatrizJacobi() {
  var table = "";
  var matrizFinal = [];
  var numero = parseInt($("#jacobi-dimension").val());

  if (numero == 0 || numero == null || numero == undefined) {
    alert("Digite um valor maior que zero.");
    return;
  }

  for (var i = 0; i <= numero + 1; i++) {
    matrizFinal.push(new Array(numero + 1));
  }

  for (var i = 1; i < matrizFinal.length - 1; i++) {
    if (i === 1) {
      table += "<table id='jacobi' style='width:100%' class='table'><tr>";

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
    "</table><br><button class='btn btn-primary' onclick='calculaJacobi()'>Calcular</button>";

  $("#jacobi-table").html("");
  $("#jacobi-table").append(table);
}

function calculaJacobi() {
  var arrayB = [];
  var finalArray = [];
  var table = document.getElementById("jacobi").querySelectorAll("#jacobi tr");

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

  EfetuaCalculos(finalArray, arrayB);
}

function EfetuaCalculos(matA) {
  var resultado = math.eigs(matA);

  console.log(resultado);
}
