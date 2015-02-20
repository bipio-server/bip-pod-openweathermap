/**
 *
 * The Bipio OpenWeatherMap Pod.  
 * ---------------------------------------------------------------
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var weather = require('openweathermap');


function Forecast(podConfig) {
  this.podConfig = podConfig; 
}


Forecast.prototype = {};


Forecast.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {

	var reqParams = {};

	if (imports.q) {
		reqParams = this.pod.getDefaults();
		reqParams['q'] = imports.q;
		reqParams['cnt'] = imports.cnt ? imports.cnt : 21;   // 7 days in 3hr increments.
		
		weather.forecast(reqParams, function(data) {
			if (data) {
				data.list.forEach( function(fc) {
					weatherObj.temp = fc.main.temp;
					weatherObj.description = fc['weather'][0].description;
					weatherObj.wind_speed = fc.wind.speed;
					weatherObj.wind_direction = fc.wind.deg;
					weatherObj.pressure = fc.main.pressure;
					next(false, weatherObj);
				});
			}	
		}); 
	}
}


// -----------------------------------------------------------------------------
module.exports = Forecast;
