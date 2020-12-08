from config import *
from models import Casa, Vendedor, Imobiliaria


@app.route("/")
def index():
    return "<a href='/index_imoveis'>Listar imoveis</a>"


@app.route("/index_imoveis")
def index_imoveis():
    imoveis = db.session.query(Casa).all()
    json_imoveis = [x.json() for x in imoveis]
    resultado = jsonify(json_imoveis)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado


@app.route("/index_vendedores")
def index_vendedor():
    vendedores = db.session.query(Vendedor).all()
    json_vendedores = [x.json() for x in vendedores]
    resultado = jsonify(json_vendedores)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado


@app.route("/index_imobiliarias")
def index_imobiliaria():
    imobiliarias = db.session.query(Imobiliaria).all()
    json_imobiliarias = [x.json() for x in imobiliarias]
    resultado = jsonify(json_imobiliarias)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado


@app.route("/include_imoveis", methods=["POST"])
def include_imoveis():
    resultado = jsonify({"status": "ok",
                      "details": "none"})
    data_post = request.get_json()
    try:
        novo = Casa(**data_post)
        db.session.add(novo)
        db.session.commit()
    except Exception as e:
        resultado = jsonify({"status": "error",
                          "details": str(e)})
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado


@app.route("/exclude_imoveis/<int:imovel_id>", methods=["DELETE"])
def exclude_imoveis(imovel_id):
    resultado = jsonify({"status": "ok", "details": "none"})
    try:
        Casa.query.filter(Casa.id == imovel_id).delete()
        db.session.commit()
    except Exception as e:
        resultado = jsonify({"status": "error", "details": str(e)})
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado

