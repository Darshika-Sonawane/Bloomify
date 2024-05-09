//import Console from Console
const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")
const componentsEle = document.querySelectorAll(".component-val")

const appId = "654140d4b79def96db641f6690c4666f" // Get your own API Key from https://home.openweathermap.org/api_keys
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	// API end point

const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError)
	} else {
		onPositionGatherError({ message: "Can't Access your location. Please enter your co-ordinates" })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)

	// Set values of Input for user to know
	latInp.value = lat
	lonInp.value = lon

	// Get Air data from weather API
	getAirQuality(lat, lon)
}

const getAirQuality = async (lat, lon) => {
	// Get data from api
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	const airData = await rawData.json()
	setValuesOfAir(airData)
	setComponentsOfAir(airData)
}

const setValuesOfAir = airData => {
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""

	// Set Air Quality Index
	airQuality.innerText = aqi

	// Set status of air quality
	let head = document.querySelector("p");
	switch (aqi) {
		case 1:
			airStat = "Good"
			color = "rgb(19, 201, 28)"
			head.innerText ="Message: Congratulations! It's the perfect time to enjoy your outdoor activities and spend time with your plants. Using organic fertilizers and composting are some ways to help maintain a healthy and sustainable garden.\nWater Deeply, Rather Than Lightly and Frequently."
			break
			case 2:
				airStat = "Fair"
				color = "rgb(15, 134, 25)"
				head.innerText ="Message: It is generally safe to enjoy your gardening activities.\nProvide sufficient sunlight to your indoor plants for their Good and healthy growth."
				break
			case 3:
				airStat = "Moderate"
				color = "rgb(201, 204, 13)"
				head.innerText ="Message: It is generally safe for you and your plants.\nHowever, we suggest keeping an eye on the air quality index and taking precautions accordingly."
				break
			case 4:
				airStat = "Poor"
				color = "rgb(204, 83, 13)" 
				head.innerText ="Message: We highly recommend taking extra care of your plants.Poor air quality can have a negative impact on the health of your plants.\nWe suggest taking measures such as moving your plants indoors or using organic fertilizers, composting and reducing water usage are some ways to help maintain a healthy and sustainable garden."
				break
		    case 5:
			    airStat = "Very Poor"
			    color = "rgb(204, 13, 13)"
				head.innerText ="Message: Don't Place your plants near Chemical factories,industrial site as the pollutants will damage plants.\nUse organic and synthetic fertilizers according to your plants."
			    break
		    default:
			    airStat = "Unknown"
	}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
}

const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components}
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		ele.innerText = components[attr] += " μg/m³"
	})
}

const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
	getAirQuality(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4))
})

getUserLocation()
Footer