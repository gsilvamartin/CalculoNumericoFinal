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
  var epislon = parseInt($("#epislon-jacobi").val());
  var table = document.getElementById("jacobi").querySelectorAll("#jacobi tr");

  table.forEach((element) => {
    line = [];
    inputs = element.querySelectorAll("input");
    inputs.forEach((element) => {
      line.push(parseInt(element.value));
    });

    var element = line.pop();

    arrayB.push(element);
    finalArray.push(line);
  });

  arrayB.shift();
  finalArray.shift();

  EfetuaCalculos(finalArray, arrayB, epislon);
}

function EfetuaCalculos(matA, matB, epislon) {
  a = matA;
  b = matB;
  respostaFinal = [];

  iteracao = [];
  diagonal = 0;

  for (i = 0; i < a.length; i++) {
    funcaoMatematica = "";
    funcaoMatematica += "1/" + a[i][diagonal];
    funcaoMatematica += "*";
    funcaoMatematica += "(";
    funcaoMatematica += b[i];

    for (j = 0; j < a[i].length; j++) {
      if (j != i) {
        funcaoMatematica += "-";
        funcaoMatematica += "(" + a[i][j] + "*";
        funcaoMatematica += "X" + j;
        funcaoMatematica += ")";
      }
    }
    funcaoMatematica += ")";
    iteracao.push(funcaoMatematica);
    diagonal += 1;
  }

  respostaFinal.push(
    `<br><br>Função de Iteração:<br> <b>${iteracao}</b>`
  );

  solucoesAntigas = [];
  for (i = 0; i < b.length; i++) {
    solucoesAntigas.push(b[i] / a[i][i]);
  }

  respostaFinal.push(
    `<br><br>Construído a solução inicial X(0): <b>${solucoesAntigas}</b><br>`
  );

  criterioParada = false;
  while (!criterioParada) {
    novasSolucoes = [];
    iteracao.forEach((f, index) => {
      novaF = f;
      for (i = 0; i < b.length; i++) {
        novaF = novaF.replaceAll("X" + i, "(" + solucoesAntigas[i] + ")");
      }
      respostaFinal.push(
        `<br>Substituindo x da função de iteração x<sub>${
          index + 1
        }</sub> de <i>${f}</i>. <br><br> Resultado: <b>${novaF} =  <i>${math.evaluate(
          novaF
        )}<i> </b><br>`
      );
      novasSolucoes.push(math.evaluate(novaF));
    });

    respostaFinal.push(`<br>Novo vetor, calculos anteriores: ${novasSolucoes}<br>`);

    diferenca = math.subtract(novasSolucoes, solucoesAntigas);

    diferencaModulo = diferenca.map((e) => {
      return Math.abs(e);
    });

    novasSolucoes_modulo = novasSolucoes.map((e) => {
      return Math.abs(e);
    });

    criterioParada =
      math.max(diferencaModulo) / math.max(novasSolucoes_modulo) < epislon
        ? true
        : false;
    solucoesAntigas = novasSolucoes;
  }

  respostaFinal.push(`<br>Solução encontrada: <b>${solucoesAntigas}</b><br><br>`);

  $("#resultado-jacobi").append(respostaFinal);
  $("#resultado-jacobi").show();
}
