from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel

class StockBase(SQLModel):
    symbol: str = Field(index=True, unique=True)
    name: Optional[str] = None
    sector: Optional[str] = None

class Stock(StockBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StockPrice(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    stock_id: int = Field(foreign_key="stock.id")
    date: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int

class Prediction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    stock_id: int = Field(foreign_key="stock.id")
    predicted_date: datetime
    predicted_price: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
