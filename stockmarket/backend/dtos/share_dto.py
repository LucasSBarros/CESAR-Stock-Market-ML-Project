class ShareDTO:
    def __init__(self, ticker, start, end, days):
        self.ticker = ticker
        self.start = start
        self.end = end
        self.days = days

    @staticmethod
    def from_request_data(data):
        # Validação básica de campos (poderia ser expandida com validações mais complexas)
        ticker = data.get("ticker")
        start = data.get("start")
        end = data.get("end")
        days = data.get("days", 60)  # Padrão para 60 se não for especificado

        if not ticker or not start or not end:
            raise ValueError("Ticker, start, and end dates are required")

        return ShareDTO(ticker, start, end, days)
