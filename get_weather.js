async function getWeather(tp, keyword) {
  let config = {
    "location": "北京市,cn",
    "key": "",
    "units": "metric",
    "language": "zh_cn",
  };

  // 天气描述
  function parseConditions(json) {
    let conditions = json.weather[0].description;
    conditions = conditions.replace(/^\w|\s\w/g, (c2) => c2.toUpperCase());
    return conditions;
  }

  // 天气描述emoji
  function parseConditionsEm(json) {
    let id = json.weather[0].id;
    let conditionsEm = void 0;
    if (id > 199 && id < 300) {
      conditionsEm = "\u26C8\uFE0F";
    }
    if (id > 299 && id < 500) {
      conditionsEm = "\u{1F326}\uFE0F";
    }
    if (id > 499 && id < 600) {
      conditionsEm = "\u{1F327}\uFE0F";
    }
    if (id > 599 && id < 700) {
      conditionsEm = "\u2744\uFE0F";
    }
    if (id > 699 && id < 800) {
      conditionsEm = "\u{1F32B}\uFE0F";
    }
    if (id == 771) {
      conditionsEm = "\u{1F300}";
    }
    if (id == 781) {
      conditionsEm = "\u{1F32A}\uFE0F";
    }
    if (id == 800) {
      conditionsEm = "\u{1F506}";
    }
    if (id > 800 && id < 804) {
      conditionsEm = "\u{1F325}\uFE0F";
    }
    if (id == 804) {
      conditionsEm = "\u2601\uFE0F";
    }
    return decodeURIComponent(conditionsEm);
  }

  // 天气图标
  function parseIcon(json) {
    let iconName = json.weather[0].icon;
    const iconApi = "http://openweathermap.org/img/w/" + iconName + ".png";
    return iconApi.url;
  }

  // 温度
  function parseTemp(json) {
    let temp = Math.round(json.main.temp) + "°C";
    return temp;
  }

  // 体感温度
  function parseFeels(json) {
    let feels = Math.round(json.main.feels_like) + "°C";
    return feels;
  }

  // 最低温度
  function parseMinTemp(json) {
    let minTemp = Math.round(json.main.temp_min) + "°C";
    return minTemp;
  }

  // 最高温度
  function parseMaxTemp(json) {
    let maxTemp = Math.round(json.main.temp_max) + "°C";
    return maxTemp;
  }

  // 海平面水平气压
  function parsePressure(json) {
    let pressure = json.main.pressure + "hPa";
    return pressure;
  }

  // 湿度
  function parseHumidity(json) {
    let humidity = json.main.humidity;
    if (humidity < 30) {
      humidity = humidity + "% ☹";
    } else if (humidity >= 30 && humidity < 50) {
      humidity = humidity + "% 😐";
    } else if (humidity >= 50 && humidity <= 60) {
      humidity = humidity + "% 😊";
    } else if (humidity > 60 && humidity <= 70) {
      humidity = humidity + "% 😐";
    } else {
      humidity = humidity + "% ☹";
    }
    return humidity;
  }

  // 海平面水平气压
  function parseSeaLevel(json) {
    let seaLevel = json.main.sea_level + "hPa";
    return seaLevel;
  }

  // 地面水平气压
  function parseGroundLevel(json) {
    let groundLevel = json.main.grnd_level + "hPa";
    return groundLevel;
  }

  // 能见度
  function parseVisibility(json) {
    let visibility = json.visibility + "m";
    return visibility;
  }

  // 风速
  function parseWindSpeed(json, config) {
    let windSpeed = json.wind.speed;
    if (config.units == "metric") {
      windSpeed = Math.round(windSpeed * 3.6) + "km/h";
    } else {
      windSpeed = windSpeed + "m/s";
    }
    return windSpeed;
  }

  // 风向
  function parseWindDirection(json, config) {
    let angle = json.wind.deg;
    let index = Math.round(angle / 45) % 8;

    let direction = void 0;
    const directions_zh_cn = ["北风", "东北风", "东风", "东南风", "南风", "西南风", "西风", "西北风"];
    const directions_en = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];

    if (config.language === "zh_cn") {
      direction = directions_zh_cn[index];
    } else {
      direction = directions_en[index];
    }
    return direction;
  }

  // 阵风
  function parseWindGust(json, config) {
    let windGust = json.wind.gust;
    if (windGust != void 0) {
      if (config.units == "metric") {
        windGust = Math.round(windGust * 3.6) + "km/h";
      } else {
        windGust = Math.round(windGust) + "m/s";
      }
    } else {
      windGust = "N/A";
    }
    return windGust;
  }

  // 云量
  function parseClouds(json) {
    let clouds = json.clouds.all + "%";
    return clouds;
  }

  // 积雨量
  function parseRain(json) {
    let rain = void 0;
    if (json.rain != void 0) {
      let rainObj = json.rain;
      let keys = Object.keys(rainObj);
      let values = Object.values(rainObj);
      if (keys[0] === "1h") {
        rain = values[0] + "mm(1h)";
      } else if (keys[0] === "3h") {
        rain = values[0] + "mm(3h)";
      }
      if (keys.length > 1) {
        if (keys[1] === "1h") {
          rain = values[1] + "mm(1h)";
        } else if (keys[1] === "3h") {
          rain = values[1] + "mm(3h)";
        }
      }
    } else {
      rain = 0 + "mm";
    }
    if (rain === void 0) {
      rain = 0 + "mm";
    }
    return rain;
  }

  // 积雪量
  function parseSnow(json) {
    let snow = void 0;
    if (json.snow != void 0) {
      let snowObj = json.snow;
      let keys = Object.keys(snowObj);
      let values = Object.values(snowObj);
      if (keys[0] === "1h") {
        snow = values[0] + "mm(1h)";
      } else if (keys[0] === "3h") {
        snow = values[0] + "mm(3h)";
      }
      if (keys.length > 1) {
        if (keys[1] === "1h") {
          snow = values[1] + "mm(1h)";
        } else if (keys[1] === "3h") {
          snow = values[1] + "mm(3h)";
        }
      }
    } else {
      snow = 0 + "mm";
    }
    if (snow === void 0) {
      snow = 0 + "mm";
    }
    return snow;
  }

  function parsePrecipitation(json, rain, snow) {
    let precipitation = void 0;
    if (rain[0] != 0 && snow[0] != 0) {
      precipitation = "(雨)" + rain + " | " + "(雪)" + snow;
    } else if  (rain[0] == 0 && snow[0] != 0) {
      precipitation = snow;
    } else if (rain[0] != 0 && snow[0] == 0) {
      precipitation = rain;
    } else {
      precipitation = rain;
    }
    return precipitation;
  }

  // 天气查询的时间
  function parseDate(json) {
    let dtStr = void 0;
    let dt = {
      year: void 0,
      month: void 0,
      date: void 0,
      hour: void 0,
      min: void 0,
      sec: void 0,
    };
    let a = new Date(json.dt * 1e3);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    dt.year = a.getFullYear();
    dt.month = months[a.getMonth()];
    dt.date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    dt.hour = a.getHours();
    dt.min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    dt.sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    dtStr = dt.year + "-" + dt.month + "-" + dt.date + " " + dt.hour + ":" + dt.min + ":" + dt.sec;
    return dtStr;
  }

  // 日出时间
  function parseSunrise(json) {
    let sr = json.sys.sunrise;
    let b = new Date(sr * 1e3);
    let srhour = b.getHours() < 10 ? "0" + b.getHours() : b.getHours();
    let srmin = b.getMinutes() < 10 ? "0" + b.getMinutes() : b.getMinutes();
    let srsec = b.getSeconds() < 10 ? "0" + b.getSeconds() : b.getSeconds();
    let sunrise = srhour + ":" + srmin + ":" + srsec;
    return sunrise;
  }

  // 日落时间
  function parseSunset(json) {
    let ss = json.sys.sunset;
    let c = new Date(ss * 1e3);
    let sshour = c.getHours() < 10 ? "0" + c.getHours() : c.getHours();
    let ssmin = c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes();
    let sssec = c.getSeconds() < 10 ? "0" + c.getSeconds() : c.getSeconds();
    let sunset = sshour + ":" + ssmin + ":" + sssec;
    return sunset;
  }

  // 地点
  function parseName(json) {
    return json.name;
  }

  function getInfo(json, keyword) {
    let weatherInfo = void 0;

    switch (keyword) {
      case "conditions":
        {
          conditions = parseConditions(json);
          conditionsEm = parseConditionsEm(json);
          weatherInfo = conditionsEm + " " + conditions;
        }
          break;
      case "icon":
        weatherInfo = parseIcon(json);
        break;
      case "temp":
        weatherInfo = parseTemp(json);
        break;
      case "feelsLike":
        weatherInfo = parseFeels(json);
        break;
      case "tempMin":
        weatherInfo = parseMinTemp(json);
        break;
      case "tempMax":
        weatherInfo = parseMaxTemp(json);
        break;
      case "pressure":
        weatherInfo = parsePressure(json);
        break;
      case "humidity":
        weatherInfo = parseHumidity(json);
        break;
      case "seaLevel":
        weatherInfo = parseSeaLevel(json);
        break;
      case "groundLevel":
        weatherInfo = parseGroundLevel(json);
        break;
      case "visibility":
        weatherInfo = parseVisibility(json);
        break;
      case "windSpeed":
        weatherInfo = parseWindSpeed(json, config);
        break;
      case "windDirection":
        weatherInfo = parseWindDirection(json, config);
        break;
      case "windGust":
        weatherInfo = parseWindGust(json, config);
        break;
      case "clouds":
        weatherInfo = parseClouds(json);
        break;
      case "rain":
        weatherInfo = parseRain(json);
        break;
      case "snow":
        weatherInfo = parseSnow(json);
        break;
      case "precipitation":
        {
          rain = parseRain(json);
          snow = parseSnow(json);
          weatherInfo = parsePrecipitation(json, rain, snow);
        }
        break;
      case "date":
        weatherInfo = parseDate(json);
        break;
      case "sunrise":
        weatherInfo = parseSunrise(json);
        break;
      case "sunset":
        weatherInfo = parseSunset(json);
        break;
      case "name":
        weatherInfo = parseName(json);
        break;
    };
    return weatherInfo;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${config.location}&lang=${config.language}&appid=${config.key}&units=${config.units}`;
  const response = await tp.obsidian.requestUrl(url);
  let info = getInfo(response.json, keyword);
  return `${info}`;
}
module.exports = getWeather;
