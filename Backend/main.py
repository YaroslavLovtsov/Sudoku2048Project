from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from Sudoku.generator import SudokuGenerator as gn

app = Flask(__name__)
cors = CORS(app, resources={"*": {"origins": "*"}})

@app.route('/get-simple')
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def get_simple():

    g = gn(1)

    response_dict = {
        'type': 'simple',
        'board': g.board
    }

    return jsonify(response_dict)

@app.route('/get-middle')
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def get_middle():

    g = gn(2)

    response_dict = {
        'type': 'medium',
        'board': g.board
    }

    return jsonify(response_dict)

@app.route('/get-hard')
@cross_origin(origin="*", headers=['Content-Type', 'Authorization'])
def get_hard():

    g = gn(4)

    response_dict = {
        'type': 'hard',
        'board': g.board
    }

    return jsonify(response_dict)

if __name__ == "__main__":
    app.run()
