window.onload = getMyLocatiion();

function getMyLocatiion() {
	console.log('?????????????');
	if (navigator.geolocation) {
		// navigator.geolocation.getCurrentPosition(displayLocation, displayError)
		var watchBtn = document.getElementById('watch1111')
		console.log('watchBtn: ', watchBtn);
		watchBtn.onclick = watchLocation
		var clearWatchBtn = document.getElementById('clearWatch')
		console.log('clearWatchBtn: ', clearWatchBtn);
		clearWatchBtn.onclick = clearWatch
	} else {
		alert('oops, no-geolocation support')
	}
}

var watchId = null
function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, displayError)
}
function clearWatch() {
	if (watchId) {
		navigator.geolocation.clearWatch(watchId)
		watchId = null
	}
}

function displayLocation(position) {
	console.log('position: ', position);
	var latitude = position.coords.latitude
	var longitude = position.coords.longitude
	var div = document.getElementById('location')
	div.innerHTML = "you are at Latitude" + latitude + ", Longitude: " + longitude

	var km = computeDistance(position.coords, ourCoords)
	var distance = document.getElementById("distance")
	distance.innerHTML = km + "km from the wickedlySmart HQ"

	if (map == null) {
		showMap(position.coords)
	}
}

function displayError(error) {
	console.log('error: ', error);
	var errorTypes = {
		0: "unknow erroe",
		1: "permission denied",
		2: "posoion is not available",
		3: "request time out",
	}
	var errormsg = errorTypes[error.code]
	if (error.code == 0 || error.code == 2) {
		errormsg = errormsg + " " + error.message
	}
	var div = document.getElementById("location")
	div.innerHTML = errormsg
}

function computeDistance(start, dest) {
	var startLatRads = degreesToRadians(start.latitude)
	var startLongRads = degreesToRadians(start.longitude)
	var destLatRads = degreesToRadians(dest.latitude)
	var destLongRads = degreesToRadians(dest.longitude)

	var Radius = 6371
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius
	
	return distance
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI) / 180
	return radians
}

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
}

var map 
function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude)
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var mapDiv = document.getElementById('map')
	map = new google.maps.Map(mapDiv, mapOptions)
}