from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
from config import Config
from db import db

app = Flask(__name__)

CORS(app)

app.config.from_object(Config)
db.init_app(app)

from controllers.share_controller import (
    get_shares,
    get_share,
    create_share,
    update_share,
    delete_share,
)

app.add_url_rule("/api/shares", "get_shares", get_shares, methods=["GET"])
app.add_url_rule("/api/shares/<int:id>", "get_share", get_share, methods=["GET"])
app.add_url_rule("/api/shares", "create_share", create_share, methods=["POST"])
app.add_url_rule("/api/shares/<int:id>", "update_share", update_share, methods=["PUT"])
app.add_url_rule(
    "/api/shares/<int:id>", "delete_share", delete_share, methods=["DELETE"]
)


@app.before_request
def log_request_info():
    print("Request Headers:", request.headers)
    print("Request Body:", request.get_data())

    @after_this_request
    def add_headers(response):
        print("Response headers:", response.headers)
        return response


if __name__ == "__main__":
    app.run(debug=True)
