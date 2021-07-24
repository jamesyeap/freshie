import axios from "axios";

const MAP_URL = "https://nominatim.openstreetmap.org/search?"

/* Set default limit to 20 restaurants */
export default async function getRestaurantsAroundMe(currentLon, currentLat, limit=50) {
    let searchURL = `${MAP_URL}q=restaurants+near+${currentLat}+${currentLon}&format=json&addressdetails=1&limit=${limit}&countrycodes=sg`

    try {
        const response = await axios({
            url: searchURL
        })


        let data = response.data
        console.log(data)
        let results = []

        // Filters the results to show only "restaurant" or "fast_food"
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === "restaurant" || data[i].type === "fast_food") {
                let restaurant = {}
                let restaurant_address = 
                    data[i].address.suburb + " " +
                    data[i].address.road + ", " +
                    data[i].address.county + " " +
                    data[i].address.country + ", S(" +
                    data[i].address.postcode + ")"
                 
                restaurant['id'] = i
                restaurant['name'] = data[i].address.amenity
                restaurant['address'] = restaurant_address
                restaurant['latitude'] = data[i].lat
                restaurant['longitude'] = data[i].lon
                restaurant['category'] = data[i].type
                
                results.push(restaurant)
            }
        }

        return results;
    } catch (err) {
        alert("error occurred while searching for restaurants")
    }
}

