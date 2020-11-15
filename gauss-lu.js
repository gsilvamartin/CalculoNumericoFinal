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
  var finalArray = [];
  var table = document.getElementById("gauss").querySelectorAll("#gauss tr");

  table.forEach((element) => {
    line = [];
    inputs = element.querySelectorAll("input");
    inputs.forEach((element) => {
      line.push(element.value);
    });

    finalArray.push(line);
  });

  finalArray.shift();

  EfetuaCalculos(matA);
}

function EfetuaCalculos(matA) {
  var matrizNova = mat(matA);

  var x = calculateLUDecomposition(matrizNova);

  console.log(x);
}

let MatrixUtil = function() {
  let Identity =  function(dim) {
      let I = [];
  
      let i, j;
      for (i = 0; i < dim; i++) {
          let r = [];
          
          for (j = 0; j < dim; j++) {
              r.push((i == j)? 1: 0);
          }
          
          I.push(r)
      }
      
      return I;
  };
  
  let Clone = function(M) {
      let C = [];
      let i, j;
      
      let rc = M.length;
      for (i = 0; i < rc; i++) {
          let m = M[i];
          let r = [];
          
          let cc = m.length;
          for (j = 0; j < cc; j++) {
              r.push(m[j]);
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  let Transpose = function(M) {
      let C = [];
      let i, j;
      
      let rc = M.length;
      let cc = M[0].length;
      
      for (i = 0; i < cc; i++) {
          let r = [];
          
          for (j = 0; j < rc; j++) {
              r.push(M[j][i]);
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  let Sum = function(A, B) {
      let C = [];
      let i, j;
      
      let rc = A.length;
      let cc = A[0].length;
  
      for (i = 0; i < rc; i++) {
          let r = [];
          
          for (j = 0; j < cc; j++) {
              r.push(A[i][j] + B[i][j]);
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  let Subtract =  function(A, B) {
      let C = [];
      let i, j;
      
      let rc = A.length;
      let cc = A[0].length;
      for (i = 0; i < rc; i++) {
          let r = [];
          
          for (j = 0; j < cc; j++) {
              r.push(A[i][j] - B[i][j]);
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  let Multiply =  function(A, B) {
      let C = [];
      
      let rCount = A.length;
      let cCount = B[0].length;
      
      let i, j, k;
      for (i = 0; i < rCount; i++) {
          let r = [];
          let ra = A[i];
          
          for (j = 0; j < cCount; j++) {
              
              let cell = 0;
              for (k = 0; k < rCount; k++) {
                  cell = cell + ra[k] * B[k][j];
              }
              
              r.push(cell);
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  let Round = function(M, decimal) {
      let C = [];
      
      let rc = M.length;
      let cc = M[0].length;
      
      let i, j;
      for (i = 0; i < rc; i++) {
          let r = [];
          let rm = M[i];
          
          for (j = 0; j < cc; j++) {
              r.push(Number(rm[j].toFixed(decimal)));
          }
          
          C.push(r);
      }
      
      return C;
  };
  
  return {
      Identity: Identity,
      Clone: Clone,
      Transpose: Transpose,
      Sum: Sum,
      Subtract: Subtract,
      Multiply: Multiply,
      Round: Round
  };
}();