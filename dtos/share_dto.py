class ShareDTO:
    def __init__(self, ticker, start, end, days):
        self.ticker = ticker
        self.start = start
        self.end = end
        self.days = days

    @staticmethod
    def from_request_data(data):
        ticker = data.get("ticker")
        start = data.get("start")
        end = data.get("end")
        days = data.get("days")

        if not ticker or not start or not end:
            raise ValueError("Ticker, start, and end dates are required")

        return ShareDTO(ticker, start, end, days)
