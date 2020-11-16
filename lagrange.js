function gerarMatrizLagrange() {
  var table = "";
  var matrizFinal = [];
  var numero = parseInt($("#lagrange-dimension").val());

  if (numero == 0 || numero == null || numero == undefined) {
    alert("Digite um valor maior que zero.");
    return;
  }

  for (var i = 0; i <= numero + 1; i++) {
    matrizFinal.push(new Array(numero + 1));
  }

  for (var i = 1; i < matrizFinal.length - 1; i++) {
    table += "<table id='lagrange' style='width:100%' class='table'><tr>";

    if (i === 1) {
      table += "<tr><td>x<td>";
      table += "<td>y</td></tr>";

      continue;
    }

    table += "<tr>";

    for (var j = 1; j <= 2; j++) {
      table += "<td><input class='input-number form-control'></td>";
    }

    table += "</tr>";
  }

  table += "</table>";

  $("#calcularLagrange").show();
  $("#lagrange-table").html("");
  $("#lagrange-table").append(table);
}

function logicaResto(aux, aux1) {
  return 0 == aux1 ? aux : logicaResto(aux1, aux % aux1);
}

function logicaMUlti(aux, aux1) {
  Math.abs(aux * aux1), logicaResto(aux, aux1);
}

var calculoLagrange = function (aux, aux1, e, o) {
  (this.valorX = [aux, e]), (this.valorY = [aux1, o]);
};

(calculoLagrange.prototype.adicionarPonto = function (aux, aux1) {
  return this.valorX.push(aux), this.valorY.push(aux1), this.pontos() - 1;
}),
  (calculoLagrange.prototype.pontos = function () {
    return this.valorX.length;
  }),
  (calculoLagrange.prototype.clear = function () {
    (this.valorX = []), (this.valorY = []);
  }),
  (calculoLagrange.prototype.plotX = function () {
    (minimo = this.valorX[0]),
      (maximo = this.valorX[0]),
      (passo = this.valorX[0]),
      (maximoPontos = 3);

    for (var aux = 1; aux < this.pontos(); aux++)
      (passo = Math.abs(logicaResto(this.valorX[aux], passo))),
        this.valorX[aux] < minimo && (minimo = this.valorX[aux]),
        this.valorX[aux] > maximo && (maximo = this.valorX[aux]);

    return (
      (minimo -= 2 * passo),
      (maximo += 2 * passo),
      (maximo - minimo) / passo > maximoPontos &&
        (passo = (maximo - minimo) / maximoPontos),
      math.range(minimo, maximo, passo).toArray()
    );
  }),
  (calculoLagrange.prototype.gerarExpressao = function (aux) {
    for (var aux1 = "", e = "", o = 0; o < this.pontos(); o++)
      aux != o &&
        ((aux1 += `(x - ${this.valorX[o]}) *`),
        (e += `(${this.valorX[aux]} - ${this.valorX[o]}) *`));
    return `(${aux1.substr(0, aux1.length - 1)})/ (${e.substr(
      0,
      e.length - 1
    )})`;
  }),
  (calculoLagrange.prototype.gerarExpressaoP = function () {
    for (var aux = "", aux1 = 0; aux1 < this.pontos(); aux1++)
      aux += `(${this.gerarExpressao(aux1)} * ${this.valorY[aux1]}) +`;
    return aux.substr(0, aux.length - 1);
  }),
  (calculoLagrange.prototype.calcularExpressao = function (aux) {
    var aux1 = { x: aux };
    return math.compile(this.gerarExpressaoP()).eval(aux1);
  }),
  (calculoLagrange.prototype.gerarExpressaoFormulasP = function () {
    for (var aux = "P(x) = ", aux1 = 0; aux1 < this.pontos(); aux1++)
      aux += `[L_${aux1}(x) * ${this.valorY[aux1]}] +`;
    return aux.substr(0, aux.length - 1);
  });

calculoLagrange.prototype.gerarExpressaoFormulas = function (aux) {
  for (var aux1 = `L_${aux}(x) = `, e = "", o = 0; o < this.pontos(); o++)
    aux != o &&
      ((aux1 += `(x - ${this.valorX[o]}) *`),
      (e += `(${this.valorX[aux]} - ${this.valorX[o]}) *`));
  return `${aux1.substr(0, aux1.length - 1)}/ ${e.substr(0, e.length - 1)}`;
};

let $tabela = $("#lagrange"),
  $calculo = $("#calcularLagrange"),
  $interpolacao = $("#buttonInterpolacao");

function carregarExpressoes(e) {
  baseL = "equacao";
  for (let a = 0; a < e.pontos(); a++)
    $("#equacao").append(`<p id="${baseL + a}">`);
  for (a = 0; a < e.pontos(); a++)
    katex.render(
      e.gerarExpressaoFormulas(a),
      document.getElementById(baseL + a),
      { throwOnError: !1 }
    );
  katex.render(
    e.gerarExpressaoFormulasP(),
    document.getElementById("equacao"),
    { throwOnError: !1 }
  );
}

$calculo.click(function () {
  var finalArray = [];

  var table = document
    .getElementById("lagrange")
    .querySelectorAll("#lagrange tr");

  table.forEach((element) => {
    line = [];
    inputs = element.querySelectorAll("input");
    inputs.forEach((element) => {
      line.push(element.value);
    });

    finalArray.push(line);
  });

  finalArray.shift();

  var a = [];
  var t = [];
  finalArray.forEach(function (e) {
    let n = parseFloat($(this).text());
    0 == e ? a.push(n) : 1 == e && t.push(n);
  }),
    (calculoLagrange = new calculoLagrange(a[0], t[0], a[1], t[1]));
  for (let n = 2; n < a.length; n++) calculoLagrange.adicionarPonto(a[n], t[n]);
  carregarExpressoes(calculoLagrange); //, $("#divEval").show();

  let valI = parseFloat($("#valor-interpolado").val());

  $("#lagrange-resultado").text(calculoLagrange.calcularExpressao(valI));

  const as = calculoLagrange.plotX(),
    tbb = as.map(function (valI) {
      return { x: e, y: calculoLagrange.calcularExpressao(valI) };
    });
});
