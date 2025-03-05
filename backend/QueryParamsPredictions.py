from enum import Enum
from pydantic import BaseModel, Field
from fastapi import Query
from dataclasses import dataclass
from datetime import timedelta

class IntervalEnum(str, Enum):
    HOURLY = "hourly"
    DAILY = "daily"

class PeriodEnum(timedelta, Enum):
    HOUR = timedelta(hours=1)
    DAY = timedelta(days=1)
    WEEK = timedelta(weeks=1)
    MONTH = timedelta(weeks=4)

# @dataclass
class QueryParams(BaseModel):
    city: str = Field(Query(
        description="City for weather predictions",
        example="Irkutsk",
    ))
    date_from: str | None = Field(Query(
        default=None,
        description="Start date for weather predictions in format 'YYYY-MM-DDThh:mm±hh''",
        example="2025-01-21T20:07+08:00",
    ))
    date_to: str | None = Field(Query(
        default=None,
        description="End date for weather predictions in format 'YYYY-MM-DDThh:mm±hh'",
        example="2025-01-22T20:07+08:00",
    ))
    interval: IntervalEnum = Field(Query(
        description="Enum for interval parameters",
        example=[
            IntervalEnum.HOURLY,
            IntervalEnum.DAILY
        ]
    ))
    period: PeriodEnum | None = Field(Query(
        default=None,
        description="Enum for interval parameters",
        example=[
            PeriodEnum.HOUR,
            PeriodEnum.DAY
        ]
    ))