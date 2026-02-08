from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from services import StockService
from models import Stock, StockPrice

router = APIRouter()

@router.post("/stocks/{symbol}")
def add_stock(symbol: str, session: Session = Depends(get_session)):
    service = StockService(session)
    try:
        stock = service.fetch_and_store_stock_data(symbol)
        if not stock:
            raise HTTPException(status_code=404, detail="Stock not found or API error")
        return stock
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stocks/{symbol}/history")
def get_history(symbol: str, session: Session = Depends(get_session)):
    service = StockService(session)
    return service.get_history(symbol)

@router.get("/stocks/{symbol}/predict")
def predict(symbol: str, days: int = 5, session: Session = Depends(get_session)):
    service = StockService(session)
    return service.predict_next_days(symbol, days)
