import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import KNeighborsRegressor
from repositories.share_repository import ShareRepository
from models.share import Share


class ShareService:
    @staticmethod
    def preprocess_data(df, n_lags):
        if df.empty:
            raise ValueError(
                "No data available for the specified date range and ticker."
            )

        df.reset_index(inplace=True)

        df["Date"] = pd.to_datetime(df["Date"], errors="coerce", utc=True)
        df = df.dropna(subset=["Close"])
        df = df.dropna(subset=["Date"])
        df.set_index("Date", inplace=True)
        df.index = df.index.tz_convert(None)
        df = df.sort_index()

        df.dropna(inplace=True)

        for i in range(1, n_lags + 1):
            df[f"lag_{i}"] = df["Adj Close"].shift(i)

        df.dropna(inplace=True)

        X = df[[f"lag_{i}" for i in range(1, n_lags + 1)]]
        y = df["Adj Close"]

        scaler_X = MinMaxScaler()
        X_scaled = scaler_X.fit_transform(X)

        scaler_y = MinMaxScaler()
        y_scaled = scaler_y.fit_transform(y.values.reshape(-1, 1))

        X_scaled = pd.DataFrame(X_scaled, index=X.index, columns=X.columns)

        return X_scaled, y_scaled, scaler_X, scaler_y

    @staticmethod
    def train_model(X_train, y_train):
        knn = KNeighborsRegressor(n_neighbors=3)
        knn.fit(X_train, y_train.ravel())
        return knn

    @staticmethod
    def make_prediction(ticker, start, end, days):
        try:
            n_lags = int(days)
            if n_lags <= 0:
                raise ValueError("n_lags must be a positive integer.")
        except ValueError as e:
            print(f"Invalid value for n_lags: {e}")
            return None

        df = ShareRepository.get_historical_data(ticker, start, end)

        X_scaled, y_scaled, scaler_X, scaler_y = ShareService.preprocess_data(df, n_lags)

        model = ShareService.train_model(X_scaled, y_scaled)

        lag_columns = [f"lag_{i}" for i in range(1, n_lags + 1)]
        last_known_values = df["Adj Close"][-n_lags:].values.reshape(1, -1)
        last_known_values_df = pd.DataFrame(last_known_values, columns=lag_columns)

        last_known_values_scaled = scaler_X.transform(last_known_values_df)

        last_known_values_scaled_df = pd.DataFrame(
            last_known_values_scaled, columns=lag_columns
        )

        future_predictions = []

        for _ in range(n_lags):
            y_pred_scaled = model.predict(last_known_values_scaled_df)
            y_pred = scaler_y.inverse_transform(y_pred_scaled.reshape(-1, 1)).flatten()[0]
            future_predictions.append(y_pred)

            new_input_scaled = np.append(
                last_known_values_scaled_df.values.flatten()[1:], y_pred_scaled
            )

            last_known_values_scaled_df = pd.DataFrame(
                [new_input_scaled], columns=lag_columns
            )

        return future_predictions

    @staticmethod
    def get_all_shares():
        return ShareRepository.get_all_shares()

    @staticmethod
    def get_share_by_id(share_id):
        return ShareRepository.get_share_by_id(share_id)

    @staticmethod
    def create_share(ticker, start, end, days):
        try:
            days = int(days)
            if days <= 0:
                raise ValueError("The number of days must be a positive integer.")
        except ValueError as e:
            print(f"Invalid value for days: {e}")
            return None

        predictions = ShareService.make_prediction(ticker, start, end, days)
        share = Share(ticker, start, end, predictions)
        return ShareRepository.save_share(share)

    @staticmethod
    def update_share(share_id, ticker, start, end, days):
        try:
            days = int(days)
            if days <= 0:
                raise ValueError("The number of days must be a positive integer.")
        except ValueError as e:
            print(f"Invalid value for days: {e}")
            return None

        share = ShareRepository.get_share_by_id(share_id)
        if share:
            predictions = ShareService.make_prediction(ticker, start, end, days)
            share.ticker = ticker
            share.start = start
            share.end = end
            share.prediction = predictions
            return ShareRepository.save_share(share)
        return None

    @staticmethod
    def delete_share(share_id):
        return ShareRepository.delete_share(share_id)