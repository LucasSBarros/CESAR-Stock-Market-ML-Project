from flask import Flask
from config import Config
from db import db

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)


from controllers.share_controller import (
    get_shares,
    get_share,
    create_share,
    update_share,
    delete_share,
)


app.add_url_rule("/api/shares", view_func=get_shares, methods=["GET"])
app.add_url_rule("/api/shares/<int:id>", view_func=get_share, methods=["GET"])
app.add_url_rule("/api/shares", view_func=create_share, methods=["POST"])
app.add_url_rule("/api/shares/<int:id>", view_func=update_share, methods=["PUT"])
app.add_url_rule("/api/shares/<int:id>", view_func=delete_share, methods=["DELETE"])

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
