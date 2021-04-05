from flask import Flask, request
from flask_cors import CORS, cross_origin
from Block import Block

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/scraper')
def main_route():
  url = request.args.get('url')
  block = Block(url)
  block_output = block.get_json()
  return block_output

app.run(host='127.0.0.1', port=5050)