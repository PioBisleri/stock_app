import os
import requests
import pandas as pd
from datetime import datetime
from sqlmodel import Session, select
from models import Stock, StockPrice, Prediction
from sklearn.linear_model import LinearRegression
import numpy as np

ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")

class StockService:
    def __init__(self, session: Session):
        self.session = session
        self.base_url = "https://www.alphavantage.co/query"

    def fetch_and_store_stock_data(self, symbol: str):
        # 1. Check if stock exists, else create
        stock = self.session.exec(select(Stock).where(Stock.symbol == symbol)).first()
        if not stock:
            # Enhanced search could go here to get name/sector
            stock = Stock(symbol=symbol, name=symbol, sector="Technology") 
            self.session.add(stock)
            self.session.commit()
            self.session.refresh(stock)

        # 2. Fetch data from Alpha Vantage (TIME_SERIES_DAILY)
        params = {
            "function": "TIME_SERIES_DAILY",
            "symbol": symbol,
            "apikey": ALPHA_VANTAGE_API_KEY,
            "outputsize": "compact" # "full" for full history
        }
        response = requests.get(self.base_url, params=params)
        data = response.json()

        if "Time Series (Daily)" not in data:
            return None # Handle error or rate limit

        ts_data = data["Time Series (Daily)"]
        
        # 3. Store prices
        # Optimization: Check latest date and only add new ones
        records_added = 0
        for date_str, values in ts_data.items():
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            
            # Check if exists
            existing = self.session.exec(select(StockPrice).where(
                StockPrice.stock_id == stock.id,
                StockPrice.date == date_obj
            )).first()
            
            if not existing:
                price = StockPrice(
                    stock_id=stock.id,
                    date=date_obj,
                    open=float(values["1. open"]),
                    high=float(values["2. high"]),
                    low=float(values["3. low"]),
                    close=float(values["4. close"]),
                    volume=int(values["5. volume"])
                )
                self.session.add(price)
                records_added += 1
        
        self.session.commit()
        return stock

    def get_history(self, symbol: str):
        stock = self.session.exec(select(Stock).where(Stock.symbol == symbol)).first()
        if not stock:
            return []
        prices = self.session.exec(select(StockPrice).where(StockPrice.stock_id == stock.id).order_by(StockPrice.date)).all()
        return prices

    def predict_next_days(self, symbol: str, days: int = 5):
        prices = self.get_history(symbol)
        if len(prices) < 10:
            return [] # Not enough data
            
        df = pd.DataFrame([p.model_dump() for p in prices])
        df['date_ordinal'] = pd.to_datetime(df['date']).map(datetime.toordinal)
        
        X = df[['date_ordinal']]
        y = df['close']
        
        model = LinearRegression()
        model.fit(X, y)
        
        last_date = pd.to_datetime(df['date'].iloc[-1])
        predictions = []
        
        for i in range(1, days + 1):
            next_date = last_date + pd.Timedelta(days=i)
            next_ordinal = np.array([[next_date.toordinal()]])
            pred_price = model.predict(next_ordinal)[0]
            
            predictions.append({
                "date": next_date.isoformat(),
                "predicted_price": pred_price
            })
            
            # Optional: Store prediction in DB
            
        return predictions
