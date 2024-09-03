import yfinance as yf
from models.share import Share
from db import db


class ShareRepository:
    @staticmethod
    def get_all_shares():
        return Share.query.all()

    @staticmethod
    def get_share_by_id(share_id):
        return Share.query.get(share_id)

    @staticmethod
    def save_share(share):
        db.session.add(share)
        db.session.commit()
        return share

    @staticmethod
    def update_share(share_id, updated_share):
        share = ShareRepository.get_share_by_id(share_id)
        if share:
            share.ticker = updated_share.ticker
            share.start = updated_share.start
            share.end = updated_share.end
            share.prediction = updated_share.prediction
            db.session.commit()
            return share
        return None

    @staticmethod
    def delete_share(share_id):
        share = ShareRepository.get_share_by_id(share_id)
        if share:
            db.session.delete(share)
            db.session.commit()
            return True
        return False

    @staticmethod
    def get_historical_data(ticker, start, end):
        """
        Baixa dados históricos do Yahoo Finance para um ticker específico
        entre datas de início e fim especificadas.
        """
        data = yf.download(ticker, start=start, end=end)
        if data.empty:
            raise ValueError("No data retrieved. Check ticker symbol and date range.")
        return data
