import createRepository from "~/api/Repository.js";

export default function(context, inject) {
    const api = createRepository(context);
    const authUrl = "http://45.136.56.44:8000/";
    const b2bUrl = "http://45.136.56.44:8001/"
        // const profileUrl = process.env.profilePageUrl;
    const repositories = {
      auth: {
        registration: api("registration/", "POST", authUrl),
        login: api("login/", "POST", authUrl),
        restore: {
          ...api("restore/", "POST", authUrl),
          ...api("restore/", "PUT", authUrl),
        },
        changePassword: api("change/password/", "POST", authUrl),
      },
      profile: {
        ...api("user/", "GET", b2bUrl),
        ...api("user/", "POST", b2bUrl),
        ...api("user/", "PUT", b2bUrl),
      },
      regions : {
        countries: api("countries/", "GET", authUrl),
        cities: api("cities/", "GET", authUrl)
      },
      hotel: {
        allInfo: api("hotel", "GET", b2bUrl),
        list: api("hotels/", "GET", b2bUrl),
        create: api("hotels/", "POST", b2bUrl),
        main: {
          ...api("hotel/main/", "GET", b2bUrl),
          ...api("hotel/main/", "POST", b2bUrl),
        },
        convenience: {
          ...api("hotel/convenience/", "GET", b2bUrl),
          ...api("hotel/convenience/", "POST", b2bUrl),
        },
        image: api("image", "POST", b2bUrl),
        images: {
          ...api("hotel/images/", "GET", b2bUrl),
          ...api("hotel/images/", "POST", b2bUrl),
          ...api("hotel/images/", "DELETE", b2bUrl),
        },
        payment: {
          ...api("hotel/payment/", "GET", b2bUrl),
          ...api("hotel/payment/", "POST", b2bUrl),
        },
        rules: {
          ...api("hotel/rules/", "GET", b2bUrl),
          ...api("hotel/rules/", "POST", b2bUrl),
        },
        services: {
          ...api("hotel/services/", "GET", b2bUrl),
          ...api("hotel/services/", "POST", b2bUrl),
          ...api("hotel/services/", "DELETE", b2bUrl),
        },
        facilities: {
          ...api("facilities/", "GET", b2bUrl)
        },
        rooms:{
          ...api("rooms/", "GET", b2bUrl)
        }
      },
      dictionary: {
        services: api("services/", "GET", b2bUrl),
        subcategories: api("subcategory/", "GET", b2bUrl),
        countries: api("countries/", "GET", authUrl),
        cities: api("cities/", "GET", authUrl),
        languages: api("languages/", "GET", b2bUrl),
        breakfasts: api("hotel/breakfast", "GET", b2bUrl),
      },
      rooms: {
        getServices: {
          ...api(
            "rooms/services/", "GET",b2bUrl,false)
        }
      },
      getRoom:{
        ...api("rooms/", "GET", b2bUrl, false)
      },
        getHotels: {
            ...api(
                "hotels/", "GET", b2bUrl, false)
        },
      getHotel: {
        ...api(
          "hotel/", "GET", b2bUrl, false)
      },

        creatingHotel: {
            ...api(
                "hotels/", "POST", b2bUrl, false)
        },

        sendingAdditionalHotelData: {
            ...api(
                "hotel", "PUT", b2bUrl, false)
        },

        getServices: {
            ...api(
                "services/", "GET", b2bUrl, false)
        },

        getRoomTypes: {
            ...api(
                "rooms/types/", "GET", b2bUrl, false)
        },

        getBedTypes: {
            ...api(
                "rooms/beds/", "GET", b2bUrl, false)
        },

        creatingRoom: {
            ...api(
                "rooms/", "POST", b2bUrl, false)
        },
        categories:{
          ...api(
            "category/", "GET", b2bUrl, false)
        },
        subcategories:{
          ...api(
            "subcategory/", "GET",b2bUrl,false)
        },
        breakfast:{
          ...api(
            "hotel/breakfast","GET",b2bUrl,false
          )
        },
        languages:{
        ...api(
          "languages/","GET",b2bUrl,false
        )
      },
        services:{
          ...api("services/","GET",b2bUrl,false)
        }
    };

    inject('api', repositories);
}
