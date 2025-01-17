export const Geocode = {
  async fromLatLng(lat, lng) {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "OK" && data.results && data.results[0]) {
        return data.results[0].formatted_address;
      }

      throw new Error(data.error_message || "No results found");
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  },
};
