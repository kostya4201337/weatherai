from fastapi import FastAPI, HTTPException, status
# from models import base
import uvicorn
import datetime

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": {"theme": "obsidian"}})

@app.get('/api/prediction')
async def main(city:str = 'Irkutsk', date_from:str | None = '2020-01-22', date_to:str | None = '2022-01-22', interval:str = 'DAYS', period:str | None = None):
    # if (date_from and date_to and period) or (not period and (not date_from or not date_to)):
    if date_from and date_to:
        if period:
            raise   HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f'Choose either a period OR a date range (date_from and date_to), but not both.',
            )
        else:
            try:
                from_date = datetime.datetime.strptime(date_from, '%Y-%m-%d')
                to_date = datetime.datetime.strptime(date_to, '%Y-%m-%d')
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f'Invalid date format. Use YYYY-MM-DD.',
                )
    else:
        return {'ok'}

if __name__ == "__main__":
    uvicorn.run("routs:app", host="192.168.0.133", port=5000, reload=True)