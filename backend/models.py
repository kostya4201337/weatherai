import datetime
import requests
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder
import pytz
import math
import pandas as pd
import openmeteo_requests
import requests_cache
from retry_requests import retry
import json

class base():
    def __init__(self, city : str, date_from : datetime.datetime, date_to : datetime.datetime, interval : str):
        self.url = "https://api.open-meteo.com/v1/forecast"
        
        self.geolocator = Nominatim(user_agent="giv_long_latitude")
        
        # Setup the Open-Meteo API client with cache and retry on error
        cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
        retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
        self.openmeteo = openmeteo_requests.Client(session = retry_session)
        
        self.city = city
        self.interval = interval
        self.date_from = date_from
        self.date_to = date_to

        location = self.geolocator.geocode(self.city)
        if location:
            self.latitude = location.latitude
            self.longitude = location.longitude
            
            tf = TimezoneFinder()
            timezone_name = tf.timezone_at(lng=self.longitude, lat=self.latitude)
            if timezone_name:
                self.tz = pytz.timezone(timezone_name)
            else:
                return str("time is not available, check your city and country")
        else:
            return str("Местоположение не найдено")
        
        print(date_from, date_to)
        
    def __give_prediction__ (self):
        # data_period_from = self.date_from-datetime.timedelta(days = 3)
        # data_period_to = self.date_from-datetime.timedelta(days = 3)
        # time_difference = self.date_to-self.date_from
        # if time_difference.total_seconds() < 0:
        #     return str('not correct data period')
        # total_seconds = time_difference.total_seconds()
        # print(total_days = total_seconds // (24 * 3600))
        
        
        # if self.periods[0] > datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=3)-datetime.timedelta(hours=-self.offset_int):
        
        # Make sure all required weather variables are listed here
        # The order of variables in hourly or daily is important to assign them correctly below
        # params = {
        #     "latitude": self.latitude,
        #     "longitude": self.longitude,
        #     "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m", "wind_gusts_10m", "temperature_80m", "temperature_120m", "temperature_180m", "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm", "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm"],
        #     # "start_date": f"{(str(data_period_from))}",
        #     "end_date": f"{str(self.date_to)}",
        # }
        
        # print(params)
        
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": self.latitude,
            "longitude": self.longitude,
            "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "visibility", "cloud_cover_high", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m", "wind_gusts_10m", "temperature_80m", "temperature_120m", "temperature_180m", "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm", "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm"],
            "start_date": self.date_from.strftime('%Y-%m-%d'),
            "end_date": self.date_to.strftime('%Y-%m-%d')
        }
        self.responses = self.openmeteo.weather_api(url, params=params)
        
        # self.responses = self.openmeteo.weather_api(self.url, params=params)
        
        daily_dataframe = self.__get_data__()
        # daily_dataframe = pd.DataFrame(data = r)
        
        daily_dataframe = daily_dataframe.sort_values('date')
        daily_dataframe.drop_duplicates(inplace=True)
        daily_dataframe = daily_dataframe.reset_index(drop=True)
        
        daily_dataframe['date'] = pd.to_datetime(daily_dataframe['date'])
        daily_dataframe.set_index('date', inplace=True)
        
        current_time = pd.Timestamp.now(tz=self.tz)

        daily_dataframe = daily_dataframe[daily_dataframe.index >= current_time]
        
        daily_dataframe = daily_dataframe[['temperature_2m', 'wind_speed_10m', 'pressure_msl', 'wind_direction_10m', 'relative_humidity_2m', 'weather_code']]
        
        print(daily_dataframe)
        
        first_6_hours = daily_dataframe[:6]
        remaining_hours = daily_dataframe[6:]
        
        # remaining_hours.index = pd.to_datetime(remaining_hours.index)
        
        grouped_remaining_hours = remaining_hours.groupby(pd.Grouper(freq='12h')).agg({
            'temperature_2m': 'mean',
            'relative_humidity_2m': 'mean',
            'wind_speed_10m': 'mean',
            'wind_direction_10m': 'mean',
            'pressure_msl': 'mean',
            'weather_code': lambda x: x.mode()[0]
        })
        
        # grouped_remaining_hours.set_index('index', inplace=True)
        
        days_map = {
            0: 'ПН',
            1: 'ВТ',
            2: 'СР',
            3: 'ЧТ',
            4: 'ПТ',
            5: 'СБ',
            6: 'ВС'
        }
        
        first_6_hours['day_of_week'] = first_6_hours.index.dayofweek.map(days_map)
        
        grouped_remaining_hours.index = pd.to_datetime(grouped_remaining_hours.index)
        
        grouped_remaining_hours['day_of_week'] = grouped_remaining_hours.index.dayofweek.map(days_map)
        
        print(grouped_remaining_hours)
        
        def group_by_day(dataframe):
            result = {"days": {}}
            ordered_days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

            for day in ordered_days:
                if day in dataframe['day_of_week'].values:
                    group = dataframe[dataframe['day_of_week'] == day]
                    result["days"][day] = group.apply(lambda x: {
                        "datetime": x.name.isoformat(),
                        "temperature": x['temperature_2m'],
                        "humidity": x['relative_humidity_2m'],
                        "wind_speed": x['wind_speed_10m'],
                        "wind_direction": x['wind_direction_10m'],
                        "WMO_code": x['weather_code'],
                        "pressure": x['pressure_msl']
                    }, axis=1).tolist()

            return result
        
        first_6_hours = group_by_day(first_6_hours)
        
        grouped_remaining_hours = group_by_day(grouped_remaining_hours)
        
        result = {'hourly':first_6_hours, 'daily':grouped_remaining_hours}
        
        return result
    
    def __get_data__(self):
        """__get_data__ this is function for get data from url

        Args:
            responses ([data -> self.response]): [setings -> self.response]

        Returns:
            [dataframe]: [dataframe after get data]
        """
        response = self.responses[0]
        print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
        print(f"Elevation {response.Elevation()} m asl")
        print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
        print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

        # Process hourly data. The order of variables needs to be the same as requested.
        hourly = response.Hourly()
        hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
        hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
        hourly_dew_point_2m = hourly.Variables(2).ValuesAsNumpy()
        hourly_apparent_temperature = hourly.Variables(3).ValuesAsNumpy()
        hourly_precipitation = hourly.Variables(4).ValuesAsNumpy()
        hourly_rain = hourly.Variables(5).ValuesAsNumpy()
        hourly_showers = hourly.Variables(6).ValuesAsNumpy()
        hourly_snowfall = hourly.Variables(7).ValuesAsNumpy()
        hourly_snow_depth = hourly.Variables(8).ValuesAsNumpy()
        hourly_weather_code = hourly.Variables(9).ValuesAsNumpy()
        hourly_pressure_msl = hourly.Variables(10).ValuesAsNumpy()
        hourly_surface_pressure = hourly.Variables(11).ValuesAsNumpy()
        hourly_cloud_cover = hourly.Variables(12).ValuesAsNumpy()
        hourly_cloud_cover_low = hourly.Variables(13).ValuesAsNumpy()
        hourly_cloud_cover_mid = hourly.Variables(14).ValuesAsNumpy()
        hourly_cloud_cover_high = hourly.Variables(15).ValuesAsNumpy()
        hourly_visibility = hourly.Variables(16).ValuesAsNumpy()
        hourly_evapotranspiration = hourly.Variables(17).ValuesAsNumpy()
        hourly_et0_fao_evapotranspiration = hourly.Variables(18).ValuesAsNumpy()
        hourly_vapour_pressure_deficit = hourly.Variables(19).ValuesAsNumpy()
        hourly_wind_speed_10m = hourly.Variables(20).ValuesAsNumpy()
        hourly_wind_speed_80m = hourly.Variables(21).ValuesAsNumpy()
        hourly_wind_speed_120m = hourly.Variables(22).ValuesAsNumpy()
        hourly_wind_speed_180m = hourly.Variables(23).ValuesAsNumpy()
        hourly_wind_direction_10m = hourly.Variables(24).ValuesAsNumpy()
        hourly_wind_direction_80m = hourly.Variables(25).ValuesAsNumpy()
        hourly_wind_direction_180m = hourly.Variables(26).ValuesAsNumpy()
        hourly_wind_direction_120m = hourly.Variables(27).ValuesAsNumpy()
        hourly_wind_gusts_10m = hourly.Variables(28).ValuesAsNumpy()
        hourly_temperature_80m = hourly.Variables(29).ValuesAsNumpy()
        hourly_temperature_120m = hourly.Variables(30).ValuesAsNumpy()
        hourly_temperature_180m = hourly.Variables(31).ValuesAsNumpy()
        hourly_soil_temperature_0cm = hourly.Variables(32).ValuesAsNumpy()
        hourly_soil_temperature_6cm = hourly.Variables(33).ValuesAsNumpy()
        hourly_soil_temperature_18cm = hourly.Variables(34).ValuesAsNumpy()
        hourly_soil_moisture_0_to_1cm = hourly.Variables(35).ValuesAsNumpy()
        hourly_soil_temperature_54cm = hourly.Variables(36).ValuesAsNumpy()
        hourly_soil_moisture_1_to_3cm = hourly.Variables(37).ValuesAsNumpy()
        hourly_soil_moisture_3_to_9cm = hourly.Variables(38).ValuesAsNumpy()
        hourly_soil_moisture_27_to_81cm = hourly.Variables(39).ValuesAsNumpy()
        hourly_soil_moisture_9_to_27cm = hourly.Variables(40).ValuesAsNumpy()
        
        hourly_data = {"date": pd.date_range(
            start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
            end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
            freq = pd.Timedelta(seconds = hourly.Interval()),
            inclusive = "left"
        )}
        
        hourly_data["temperature_2m"] = hourly_temperature_2m
        hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m
        hourly_data["dew_point_2m"] = hourly_dew_point_2m
        hourly_data["apparent_temperature"] = hourly_apparent_temperature
        hourly_data["precipitation"] = hourly_precipitation
        hourly_data["rain"] = hourly_rain
        hourly_data["showers"] = hourly_showers
        hourly_data["snowfall"] = hourly_snowfall
        hourly_data["snow_depth"] = hourly_snow_depth
        hourly_data["weather_code"] = hourly_weather_code
        hourly_data["pressure_msl"] = hourly_pressure_msl
        hourly_data["surface_pressure"] = hourly_surface_pressure
        hourly_data["cloud_cover"] = hourly_cloud_cover
        hourly_data["cloud_cover_low"] = hourly_cloud_cover_low
        hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid
        hourly_data["cloud_cover_high"] = hourly_cloud_cover_high
        hourly_data["visibility"] = hourly_visibility
        hourly_data["evapotranspiration"] = hourly_evapotranspiration
        hourly_data["et0_fao_evapotranspiration"] = hourly_et0_fao_evapotranspiration
        hourly_data["vapour_pressure_deficit"] = hourly_vapour_pressure_deficit
        hourly_data["wind_speed_10m"] = hourly_wind_speed_10m
        hourly_data["wind_speed_80m"] = hourly_wind_speed_80m
        hourly_data["wind_speed_120m"] = hourly_wind_speed_120m
        hourly_data["wind_speed_180m"] = hourly_wind_speed_180m
        hourly_data["wind_direction_10m"] = hourly_wind_direction_10m
        hourly_data["wind_direction_80m"] = hourly_wind_direction_80m
        hourly_data["wind_direction_180m"] = hourly_wind_direction_180m
        hourly_data["wind_direction_120m"] = hourly_wind_direction_120m
        hourly_data["wind_gusts_10m"] = hourly_wind_gusts_10m
        hourly_data["temperature_80m"] = hourly_temperature_80m
        hourly_data["temperature_120m"] = hourly_temperature_120m
        hourly_data["temperature_180m"] = hourly_temperature_180m
        hourly_data["soil_temperature_0cm"] = hourly_soil_temperature_0cm
        hourly_data["soil_temperature_6cm"] = hourly_soil_temperature_6cm
        hourly_data["soil_temperature_18cm"] = hourly_soil_temperature_18cm
        hourly_data["soil_moisture_0_to_1cm"] = hourly_soil_moisture_0_to_1cm
        hourly_data["soil_temperature_54cm"] = hourly_soil_temperature_54cm
        hourly_data["soil_moisture_1_to_3cm"] = hourly_soil_moisture_1_to_3cm
        hourly_data["soil_moisture_3_to_9cm"] = hourly_soil_moisture_3_to_9cm
        hourly_data["soil_moisture_27_to_81cm"] = hourly_soil_moisture_27_to_81cm
        hourly_data["soil_moisture_9_to_27cm"] = hourly_soil_moisture_9_to_27cm

        hourly_dataframe = pd.DataFrame(data = hourly_data)
        # print(hourly_dataframe)

        # Process daily data. The order of variables needs to be the same as requested.
        # daily = response.Daily()
        # daily_ = daily.Variables(0).ValuesAsNumpy()

        # daily_data = {"date": pd.date_range(
        # 	start = pd.to_datetime(daily.Time(), unit = "s", utc = True),
        # 	end = pd.to_datetime(daily.TimeEnd(), unit = "s", utc = True),
        # 	freq = pd.Timedelta(seconds = daily.Interval()),
        # 	inclusive = "left"
        # )}
        # daily_data[""] = daily_

        # daily_dataframe = pd.DataFrame(data = daily_data)
        return hourly_dataframe