from db import db  # Importar db do módulo separado


class Share(db.Model):
    __tablename__ = "shares"
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(10), nullable=False)
    start = db.Column(db.String(10), nullable=False)
    end = db.Column(db.String(10), nullable=False)
    prediction = db.Column(db.JSON, nullable=False)

    def __init__(self, ticker, start, end, prediction):
        self.ticker = ticker
        self.start = start
        self.end = end
        self.prediction = prediction
