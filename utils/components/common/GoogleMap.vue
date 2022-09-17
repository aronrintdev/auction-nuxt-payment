<template>
  <div class="location-marker-wrapper">
    <div id="location-marker-map" :class="className"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',

  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      map: null,
      bounds: null,
      markers: [],
      markerCoordinates: [
        {
          latitude: this.latitude,
          longitude: this.longitude,
        },
      ],
    }
  },

  mounted() {
    this.geolocate()
  },

  methods: {
    // Update the currenn location
    geolocate() {
      this.bounds = new window.google.maps.LatLngBounds()
      const element = document.getElementById('location-marker-map')
      const mapCentre = this.markerCoordinates[0]
      const options = {
        center: new window.google.maps.LatLng(
          mapCentre.latitude,
          mapCentre.longitude
        ),
      }
      this.map = new window.google.maps.Map(element, options)
      this.markerCoordinates.forEach((coord) => {
        const position = new window.google.maps.LatLng(
          coord.latitude,
          coord.longitude
        )
        const marker = new window.google.maps.Marker({
          position,
          map: this.map,
        })
        this.markers.push(marker)
        this.map.fitBounds(this.bounds.extend(position))
      })
    },
  },
}
</script>