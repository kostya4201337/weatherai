from fastapi import FastAPI, HTTPException, status, Query, Depends
from models import base
import uvicorn
from tensorflow.keras.models import load_model
import datetime

from QueryParamsPredictions import QueryParams


tags_metadata = [
    {
        "name": "prediction",
        "description": "API for work with wheather **predictions**",
    },
    {
        "name": "weather",
        "description": "API for work with weather data",
    },
]

description = """
Whather  API helps you do awesome stuff with weather in yor area. ⛅☀️🌦️

## /api/prediction

You can **get prediction** with this api.
"""

APP = FastAPI(
    title="WeatherAI API",
    description=description,
    summary="API for predicting weather",
    version="0.0.1",
    # terms_of_service="http://example.com/terms/",
    contact={
        "name": "Shipovskii Alexander",
        "url": r"http://t.me/shipovnikAAA",
        "email": "shipovniktuklosaw@gmail.com",
    },
    openapi_tags=tags_metadata,
    swagger_ui_parameters={"syntaxHighlight": {"theme": "obsidian"}}
    )

@APP.get('/', tags=["weather"])
def hi():
    return 'API for work with weather data'

@APP.get('/api/prediction', tags=["prediction"])
# async def prediction(city:str = 'Irkutsk', date_from:str | None = '2020-01-22', date_to:str | None = '2022-01-22', interval:str = 'DAYS', period:str | None = None):
# async def prediction(city:str = Query(None, description="My description"), date_from:str | None = '2020-01-22', date_to:str | None = '2022-01-22', interval:str = 'DAYS', period:str | None = None):
async def prediction(params : QueryParams = Depends()):
    """
    # Get wheather predictions
    """
    # item = Item(city=city, date_from=date_from, date_to=date_to, interval=interval, period=period)
    # if (date_from and date_to and period) or (not period and (not date_from or not date_to)):
    if params.date_from and params.date_to:
        if params.period:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f'Choose either a period OR a date range (date_from and date_to), but not both.',
            )
        else:
            try:
                date_from = datetime.datetime.strptime(params.date_from, '%Y-%m-%dT%H:%M%z')
                date_to = datetime.datetime.strptime(params.date_to, 'Y-%%m-%dT%H:%M%z')
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid date format. Use 'YYYY-MM-DDThh:mm±hh'",
                )
            print(params.date_from, params.date_to)
    else:
        if params.period:
            now = datetime.datetime.now(datetime.timezone.utc)
            # print(params.period.to_timedelta())
            date_from = now - params.period.to_timedelta() - datetime.timedelta(days=6)
            print(date_from)
            date_to = now
            
            temp_from = date_to
            temp_to = date_to + params.period.to_timedelta()
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f'You must provide date range',
            )
    try:
        data = base(city = params.city, date_from = temp_from, date_to=temp_to, interval=params.interval).__give_prediction__()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        return data

if __name__ == "__main__":
    # model_temp = load_model(r'\models\best_baselineV2_fix_temp.keras')
    # model_pressure = load_model(r'\models\best_baselineV2_fix_pressure.keras')
    # model_humidity = load_model(r'\models\best_baselineV2_fix_humidity.keras')
    # model_wind = load_model(r'\models\best_baselineV2_fix_wind.keras')
    # model_direction = load_model(r'\models\best_baselineV1_fix_direction.keras')
    uvicorn.run("routs:APP", host="192.168.0.133", port=5000, reload=True)