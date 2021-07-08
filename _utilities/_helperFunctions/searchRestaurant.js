/*
	INPUT:
		1. <query> -> example "subway+singapore+restaurant"
		2. <result-limit> -> integer
	
	https://nominatim.openstreetmap.org/search?
		q=<query> 
		&format=json
		&addressdetails=1
		&limit=<result-limit>

	OUTPUT (example):

	[
    {
        "place_id": 173540938,
        "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        "osm_type": "way",
        "osm_id": 362268162,
        "boundingbox": [
            "1.2882851",
            "1.2884001",
            "103.8047963",
            "103.8049113"
        ],
        "lat": "1.2883426",
        "lon": "103.80485379999999",
        "display_name": "Subway, 01-11, Alexandra Road, Queenstown, Central, 159971, Singapore",
        "class": "amenity",
        "type": "fast_food",
        "importance": 0.201,
        "icon": "https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png",
        "address": {
            "amenity": "Subway",
            "house_number": "01-11",
            "road": "Alexandra Road",
            "suburb": "Queenstown",
            "county": "Central",
            "postcode": "159971",
            "country": "Singapore",
            "country_code": "sg"
        }
    },
    {
        "place_id": 54295878,
        "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        "osm_type": "node",
        "osm_id": 4583503314,
        "boundingbox": [
            "1.2797971",
            "1.2798971",
            "103.8528513",
            "103.8529513"
        ],
        "lat": "1.2798471",
        "lon": "103.8529013",
        "display_name": "Subway, Marina View, Downtown Central, Downtown Core, Central, 018969, Singapore",
        "class": "amenity",
        "type": "fast_food",
        "importance": 0.201,
        "icon": "https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png",
        "address": {
            "amenity": "Subway",
            "road": "Marina View",
            "neighbourhood": "Downtown Central",
            "suburb": "Downtown Core",
            "county": "Central",
            "postcode": "018969",
            "country": "Singapore",
            "country_code": "sg"
        }
    }
]
*/

import axios from "axios";

const MAP_URL = "https://nominatim.openstreetmap.org/search?"

export default async function searchRestaurant(restaurantName, limit=3) {
    let cleanedRestaurantName = restaurantName.replace(/\s/g, '+') // replace space with "+"

    let searchURL = `${MAP_URL}q=${cleanedRestaurantName}&format=json&addressdetails=1&limit=${limit}`

    try {
        const response = await axios({
            url: searchURL
        })

        console.log(response.data)
        return response.data

    } catch (err) {
        alert("error occurred while searching for restaurants")
    }
}

