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
        self.url = "https://api.open-meteo.com/v1/forecast" #url for get data
        
        self.geolocator = Nominatim(user_agent="giv_long_latitude") # create geolocator
        
        # Setup the Open-Meteo API client with cache and retry on error
        cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
        retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
        self.openmeteo = openmeteo_requests.Client(session = retry_session)
        
        # local varibles
        self.city = city
        self.interval = interval
        self.date_from = date_from
        self.date_to = date_to
        
        # geodata
        location = self.geolocator.geocode(self.city)
        # check if location found
        if location:
            self.latitude = location.latitude
            self.longitude = location.longitude
            
            #object timezone
            tf = TimezoneFinder()
            # name of timezone
            timezone_name = tf.timezone_at(lng=self.longitude, lat=self.latitude)
            if timezone_name:
                # object timezone
                tz = pytz.timezone(timezone_name)

                # now time
                # current_time = datetime.datetime.now(tz)

                # смещение
                # utc_offset_timedelta = current_time.utcoffset()

                # # Преобразуем смещение в часы
                # total_seconds = utc_offset_timedelta.total_seconds()
                # utc_offset_hours = total_seconds / 3600

                # # Форматируем смещение для вывода (учитываем знак)
                # if utc_offset_hours >= 0:
                #     self.offset_int = utc_offset_hours
                # else:
                #     self.offset_int = -utc_offset_hours

                # print(f"Часовой пояс: {timezone_name}")
                # print(f"Смещение от UTC: {self.offset_int}")
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
        
        days_map = {
            0: 'ПН',
            1: 'ВТ',
            2: 'СР',
            3: 'ЧТ',
            4: 'ПТ',
            5: 'СБ',
            6: 'ВС'
        }
        
        daily_dataframe['day_of_week'] = daily_dataframe.index.dayofweek.map(days_map)
        
        daily_dataframe = daily_dataframe[['temperature_2m', 'wind_speed_10m', 'pressure_msl', 'wind_direction_10m', 'relative_humidity_2m', 'weather_code', 'day_of_week']]
        
        print(daily_dataframe)
        
        result = {"days": {}}

        # Группируем по дням недели
        ordered_days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
        
        # Группируем по дням недели
        for day in ordered_days:
            if day in daily_dataframe['day_of_week'].values:
                group = daily_dataframe[daily_dataframe['day_of_week'] == day]
                result["days"][day] = group.apply(lambda x: {
                    "datetime": x.name.isoformat(),
                    "temperature": x['temperature_2m'],
                    "humidity": x['relative_humidity_2m'],
                    "wind_speed": x['wind_speed_10m'],
                    "wind_direction": x['wind_direction_10m'],
                    "WMO_code": x['weather_code'],
                    "pressure": x['pressure_msl']
                }, axis=1).tolist()

        print(result)
        
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
        hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()                                                                     # type: ignore
        hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()                                                               # type: ignore
        hourly_dew_point_2m = hourly.Variables(2).ValuesAsNumpy()                                                                       # type: ignore
        hourly_apparent_temperature = hourly.Variables(3).ValuesAsNumpy()                                                               # type: ignore
        hourly_precipitation = hourly.Variables(4).ValuesAsNumpy()                                                                      # type: ignore
        hourly_rain = hourly.Variables(5).ValuesAsNumpy()                                                                               # type: ignore
        hourly_snowfall = hourly.Variables(6).ValuesAsNumpy()                                                                           # type: ignore
        hourly_snow_depth = hourly.Variables(7).ValuesAsNumpy()                                                                         # type: ignore
        hourly_weather_code = hourly.Variables(8).ValuesAsNumpy()                                                                       # type: ignore
        hourly_pressure_msl = hourly.Variables(9).ValuesAsNumpy()                                                                       # type: ignore
        hourly_surface_pressure = hourly.Variables(10).ValuesAsNumpy()                                                                  # type: ignore
        hourly_cloud_cover = hourly.Variables(11).ValuesAsNumpy()                                                                       # type: ignore
        hourly_cloud_cover_low = hourly.Variables(12).ValuesAsNumpy()                                                                   # type: ignore
        hourly_cloud_cover_mid = hourly.Variables(13).ValuesAsNumpy()                                                                   # type: ignore
        hourly_cloud_cover_high = hourly.Variables(14).ValuesAsNumpy()                                                                  # type: ignore
        hourly_et0_fao_evapotranspiration = hourly.Variables(15).ValuesAsNumpy()                                                        # type: ignore
        hourly_vapour_pressure_deficit = hourly.Variables(16).ValuesAsNumpy()                                                           # type: ignore
        hourly_wind_speed_10m = hourly.Variables(17).ValuesAsNumpy()                                                                    # type: ignore
        hourly_wind_speed_100m = hourly.Variables(18).ValuesAsNumpy()                                                                   # type: ignore
        hourly_wind_direction_10m = hourly.Variables(19).ValuesAsNumpy()                                                                # type: ignore
        hourly_wind_direction_100m = hourly.Variables(20).ValuesAsNumpy()                                                               # type: ignore
        hourly_wind_gusts_10m = hourly.Variables(21).ValuesAsNumpy()                                                                    # type: ignore
        hourly_soil_temperature_0_to_7cm = hourly.Variables(22).ValuesAsNumpy()                                                         # type: ignore
        hourly_soil_temperature_7_to_28cm = hourly.Variables(23).ValuesAsNumpy()                                                        # type: ignore
        hourly_soil_temperature_28_to_100cm = hourly.Variables(24).ValuesAsNumpy()                                                      # type: ignore
        hourly_soil_temperature_100_to_255cm = hourly.Variables(25).ValuesAsNumpy()                                                     # type: ignore
        hourly_soil_moisture_0_to_7cm = hourly.Variables(26).ValuesAsNumpy()                                                            # type: ignore
        hourly_soil_moisture_7_to_28cm = hourly.Variables(27).ValuesAsNumpy()                                                           # type: ignore
        hourly_soil_moisture_28_to_100cm = hourly.Variables(28).ValuesAsNumpy()                                                         # type: ignore
        hourly_soil_moisture_100_to_255cm = hourly.Variables(29).ValuesAsNumpy()                                                        # type: ignore

        hourly_data = {"date": pd.date_range(
            start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),                                                              # type: ignore
            end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),                                                             # type: ignore
            freq = pd.Timedelta(seconds = hourly.Interval()),                                                                           # type: ignore
            inclusive = "left"
        )}
        hourly_data["temperature_2m"] = hourly_temperature_2m                                                                           # type: ignore
        hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m                                                               # type: ignore
        hourly_data["dew_point_2m"] = hourly_dew_point_2m                                                                               # type: ignore
        hourly_data["apparent_temperature"] = hourly_apparent_temperature                                                               # type: ignore
        hourly_data["precipitation"] = hourly_precipitation                                                                             # type: ignore
        hourly_data["rain"] = hourly_rain                                                                                               # type: ignore
        hourly_data["snowfall"] = hourly_snowfall                                                                                       # type: ignore
        hourly_data["snow_depth"] = hourly_snow_depth                                                                                   # type: ignore
        hourly_data["weather_code"] = hourly_weather_code                                                                               # type: ignore
        hourly_data["pressure_msl"] = hourly_pressure_msl                                                                               # type: ignore
        hourly_data["surface_pressure"] = hourly_surface_pressure                                                                       # type: ignore
        hourly_data["cloud_cover"] = hourly_cloud_cover                                                                                 # type: ignore
        hourly_data["cloud_cover_low"] = hourly_cloud_cover_low                                                                         # type: ignore
        hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid                                                                         # type: ignore
        hourly_data["cloud_cover_high"] = hourly_cloud_cover_high                                                                       # type: ignore
        hourly_data["et0_fao_evapotranspiration"] = hourly_et0_fao_evapotranspiration                                                   # type: ignore
        hourly_data["vapour_pressure_deficit"] = hourly_vapour_pressure_deficit                                                         # type: ignore
        hourly_data["wind_speed_10m"] = hourly_wind_speed_10m                                                                           # type: ignore
        hourly_data["wind_speed_100m"] = hourly_wind_speed_100m                                                                         # type: ignore
        hourly_data["wind_direction_10m"] = hourly_wind_direction_10m                                                                   # type: ignore
        hourly_data["wind_direction_100m"] = hourly_wind_direction_100m                                                                 # type: ignore
        hourly_data["wind_gusts_10m"] = hourly_wind_gusts_10m                                                                           # type: ignore
        hourly_data["soil_temperature_0_to_7cm"] = hourly_soil_temperature_0_to_7cm                                                     # type: ignore
        hourly_data["soil_temperature_7_to_28cm"] = hourly_soil_temperature_7_to_28cm                                                   # type: ignore
        hourly_data["soil_temperature_28_to_100cm"] = hourly_soil_temperature_28_to_100cm                                               # type: ignore
        hourly_data["soil_temperature_100_to_255cm"] = hourly_soil_temperature_100_to_255cm                                             # type: ignore
        hourly_data["soil_moisture_0_to_7cm"] = hourly_soil_moisture_0_to_7cm                                                           # type: ignore
        hourly_data["soil_moisture_7_to_28cm"] = hourly_soil_moisture_7_to_28cm                                                         # type: ignore
        hourly_data["soil_moisture_28_to_100cm"] = hourly_soil_moisture_28_to_100cm                                                     # type: ignore
        hourly_data["soil_moisture_100_to_255cm"] = hourly_soil_moisture_100_to_255cm                                                   # type: ignore

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