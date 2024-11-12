import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
from tensorflow.keras.callbacks import EarlyStopping
from repositories.share_repository import ShareRepository
from models.share import Share


class ShareService:
    @staticmethod
    def preprocess_data(df):
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

        features = df[["Open", "High", "Low", "Close", "Adj Close", "Volume"]].values

        scaler_features = MinMaxScaler(feature_range=(0, 1))
        scaled_features = scaler_features.fit_transform(features)

        scaler_close = MinMaxScaler(feature_range=(0, 1))
        scaled_close = scaler_close.fit_transform(df[["Close"]].values)

        return scaled_features, scaler_close

    @staticmethod
    def create_sequences_multi_step(data, sequence_length, future_steps):
        X, y = [], []
        for i in range(sequence_length, len(data) - future_steps + 1):
            X.append(data[i - sequence_length : i])
            y.append(data[i : i + future_steps, 3])
        return np.array(X), np.array(y)

    @staticmethod
    def train_model(X_train, y_train, sequence_length, feature_count, future_steps):
        model = Sequential()
        model.add(Input(shape=(sequence_length, feature_count)))
        model.add(LSTM(units=100, return_sequences=True))
        model.add(Dropout(0.3))
        model.add(LSTM(units=100, return_sequences=True))
        model.add(Dropout(0.3))
        model.add(LSTM(units=50, return_sequences=False))
        model.add(Dropout(0.2))
        model.add(Dense(units=future_steps))
        model.compile(optimizer="adam", loss="mean_squared_error")

        early_stopping = EarlyStopping(
            monitor="val_loss", patience=5, restore_best_weights=True
        )
        model.fit(
            X_train,
            y_train,
            epochs=20,
            batch_size=32,
            validation_split=0.2,
            callbacks=[early_stopping],
        )
        return model

    @staticmethod
    def make_prediction(ticker, start, end, days):

        df = ShareRepository.get_historical_data(ticker, start, end)

        scaled_features, scaler_close = ShareService.preprocess_data(df)
        sequence_length = 60
        future_steps = int(days)

        X, y = ShareService.create_sequences_multi_step(
            scaled_features, sequence_length, future_steps
        )

        train_size = int(len(X) * 0.8)
        X_train, X_test = X[:train_size], X[train_size:]
        y_train, y_test = y[:train_size], y[train_size:]

        model = ShareService.train_model(
            X_train, y_train, sequence_length, X.shape[2], future_steps
        )

        last_sequence = scaled_features[-sequence_length:]
        last_sequence = last_sequence.reshape(
            (1, sequence_length, scaled_features.shape[1])
        )
        future_predictions = model.predict(last_sequence)

        predictions = scaler_close.inverse_transform(future_predictions).flatten()

        return predictions.tolist()

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
