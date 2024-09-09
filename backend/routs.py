from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def main():
    data = request.get_json()
    if data == {"button":"readress"}:
        return reg()
    return {'main':f'main, {data}'}, 200

@app.route('/reg', methods=['GET'])
def reg():
    return 'aafafaf'

@app.route('/about')
def about():
    pass

if __name__ == '__main__':
    app.run(debug=True)
