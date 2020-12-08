$( document ).ready(function() {
  $("#inicio").removeClass("d-none");
  $("#listar_imoveis").addClass("d-none");
  $("#listar_vendedores").addClass("d-none");
  $("#listar_imobiliarias").addClass("d-none");

  $("#botao_listar_casas").click(function () {
    $.ajax({
      url: "http://localhost:5000/index_imoveis",
      method: "GET",
      dataType: "json",
      success: listarImoveis,
      error: function () {
        alert("Erro no Back-end");
      }
    });

    function listarImoveis(casas) {
      $("#listar_imoveis tr>td").remove();
      for (var i in casas) {
        line = "<tr id='linha_" + casas[i].id + "'>" +
          "<td>" + casas[i].quarto + "</td>" +
          "<td>" + casas[i].banheiro + "</td>" +
          "<td>" + casas[i].sala + "</td>" +
          "<td>" + casas[i].cozinha + "</td>" +
          "<td>" + casas[i].piscina + "</td>" +
          '<td><a href=# id="exclude_' + casas[i].id + '" ' +
          'class="exclude_casa"><p class="badge badge-danger">Excluir</p></a>' +
          '</td>' +

          "</tr>";
        $("#tabela_imoveis").append(line);
      };

      $("#inicio").addClass("d-none");
      $("#listar_imoveis").removeClass("d-none");
      $("#listar_vendedores").addClass("d-none");
      $("#listar_imobiliarias").addClass("d-none");
    };
  });

  $("#botao_listar_vendedores").click(function () {
    $.ajax({
      url: "http://localhost:5000/index_vendedores",
      method: "GET",
      dataType: "json",
      success: listarVendedores,
      error: function () {
        alert("Erro no Back-end");
      }
    });

    function listarVendedores(vendedores) {
      $("#listar_vendedores tr>td").remove();
      for (var i in vendedores) {
        line = "<tr id='linha_" + vendedores[i].id + "'>" +
          "<td>" + vendedores[i].cpf + "</td>" +
          "<td>" + vendedores[i].nome + "</td>" +
          "<td>" + vendedores[i].idade + "</td>" +
          "</tr>";
        $("#tabela_vendedores").append(line);
      };

      $("#inicio").addClass("d-none");
      $("#listar_imoveis").addClass("d-none");
      $("#listar_imobiliarias").addClass("d-none");
      $("#listar_vendedores").removeClass("d-none");
    };
  });

  $("#botao_listar_imobiliarias").click(function () {
    $.ajax({
      url: "http://localhost:5000/index_imobiliarias",
      method: "GET",
      dataType: "json",
      success: listarImobiliarias,
      error: function () {
        alert("Erro no Back-end");
      }
    });

    function listarImobiliarias(imobiliarias) {
      console.log(imobiliarias[0].nome);
      $("#listar_imobiliarias tr>td").remove();
      for (var i in imobiliarias) {
        line = "<tr id='linha_" + imobiliarias[i].id + "'>" +
          "<td>" + imobiliarias[i].nome + "</td>" +
          "<td>" + imobiliarias[i].cnpj + "</td>" +
          "<td>" + imobiliarias[i].cep + "</td>" +
          "<td>" + imobiliarias[i].casa.quarto + "</td>" +
          "<td>" + imobiliarias[i].casa.banheiro + "</td>" +
          "<td>" + imobiliarias[i].casa.sala + "</td>" +
          "<td>" + imobiliarias[i].casa.cozinha + "</td>" +
          "<td>" + imobiliarias[i].casa.piscina + "</td>" +
          "<td>" + imobiliarias[i].vendedor.cpf + "</td>" +
          "<td>" + imobiliarias[i].vendedor.nome + "</td>" +
          "<td>" + imobiliarias[i].vendedor.idade + "</td>" +
          "</tr>";
        $("#tabela_imobiliarias").append(line);
      };

      $("#inicio").addClass("d-none");
      $("#listar_imoveis").addClass("d-none");
      $("#listar_vendedores").addClass("d-none");
      $("#listar_imobiliarias").removeClass("d-none");
    };
  });

  $("#incluir_imovel").click(function () {
    input_quarto = $("#input_quarto").val();
    input_banheiro = $("#input_banheiro").val();
    input_sala = $("#input_sala").val();
    input_cozinha = $("#input_cozinha").val();
    input_piscina = $("#input_piscina").val();
    data_post = JSON.stringify({
      quarto: input_quarto,
      banheiro: input_banheiro,
      sala: input_sala,
      cozinha: input_cozinha,
      piscina: input_piscina
    });

    $.ajax({
      url: "http://localhost:5000/include_imoveis",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: data_post,
      success: incluirImovel,
      error: incluirImovelErro
    });

    function incluirImovel(resultado) {
      if (resultado.status == "ok") {
        alert("Operação feita com êxito");
        $("#input_quarto").val("");
        $("#input_banheiro").val("");
        $("#input_sala").val("");
        $("#input_cozinha").val("");
        $("#input_piscina").val("");
      } else {
        alert("Operação inconclusiva");
      }
    };

    function incluirImovelErro(resultado) {
      alert("Houve um erro no Back-end");
    };
  });

  $( document ).on("click", ".exclude_casa", function() {
    component_id = $(this).attr("id");
    identifier_str = "exclude_";
    var id_imovel = component_id.substring(identifier_str.length);
    $.ajax({
      url: "http://localhost:5000/exclude_imoveis/" + id_imovel,
      type: "DELETE",
      dataType: "json",
      success: excludedCasa,
      error: exclusionError
    });

    function excludedCasa(resultado) {
      if (resultado.status == "ok") {
        $("#linha_" + id_imovel).fadeOut(1000, function() {
          alert("Imóvel excluído com sucesso");
        });
      } else {
        alert(resultado.status + ": " + resultado.details);
      };
    };

    function exclusionError(resultado) {
      alert("Houve um erro no back-end");
    };
  });
});

