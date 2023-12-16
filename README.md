# Intro

get_weather is a user script for the Templater plugin in Obsidian that is used to insert weather data into templates.

![get_weather](https://github.com/kaluosifa/obsidian-templater-get_weather/assets/41535519/d61286e4-6e9c-4e3d-90e6-66c19ccbe944)


# Configuration

- `location`: Your city names.
- `key`: Your unique API key (you can always find it on your [OpenWeather](https://openweathermap.org/) account page under the "API key" tab).
- `units`: Units of measurement. standard, metric and imperial units are available. 
- `language`: You can use this parameter to get the output in your language. [Learn more](https://openweathermap.org/current#multi).

# Usage

```
<% tp.user.get_weather(tp, keyword) %>
```

- `tp` is global namespace in Templater.
- `keyword` has the following values:

  | keyword | description |
  |:--|:--|
  |`conditions`|Weather condition with emoji.|
  |`icon`|Url for Weather condition icon.|
  |`temp`|Temperature.|
  |`feelsLike`|This temperature parameter accounts for the human perception of weather.|
  |`tempMin`|Minimum temperature at the moment.|
  |`tempMax`|Maximum temperature at the moment.|
  |`pressure`|Atmospheric pressure on the sea level, hPa.|
  |`humidity`|Humidity, %.|
  |`seaLevel`|Atmospheric pressure on the sea level, hPa.|
  |`groundLevel`|Atmospheric pressure on the ground level, hPa.|
  |`visibility`|Visibility, meter.|
  |`windSpeed`|Wind speed. Unit Default: meter/sec, Metric: kilometer/hour, Imperial: miles/hour.|
  |`windDirection`|Wind direction.|
  |`windGust`|Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.|
  |`clouds`|Cloudiness, %.|
  |`rain`|Rain volume for the last 1 hour or last 3 hours, mm.|
  |`snow`|Snow volume for the last 1 hour or last 3 hours, mm.|
  |`precipitation`|Rain volume or Snow volume.|
  |`date`|Time of weather data query.|
  |`sunrise`|Sunrise time.|
  |`sunset`|Sunset time.|
  |`name`|City name.|

# Reference

- [OpenWeather API Document - Current weather data](https://openweathermap.org/current)
- [Templater - User Scripts](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html)
- [JavaScript Tutorials](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

