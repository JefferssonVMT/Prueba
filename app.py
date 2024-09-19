from flask import Flask, jsonify, render_template, request
from dotenv import load_dotenv

app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def index():
    
    if request.method == "POST":

        pedido = {
            "infoPedido" : {
                "cliente" : request.form.get("cliente"),
                "producto" : request.form.get("producto"),
                "cantidad" : request.form.get("cantidad"),
            },
            "infoVendedor" : {
                "coordenadas" : request.form.get("coordenadas")
            }            
        }

        return jsonify(pedido)

    return render_template('index.html')