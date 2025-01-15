
    let map, userMarker, orderMarker, userLocation, orderLocation;

    // Initialize Google Map
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            zoom: 14,
        });
    }

    function trackOrder() {
        const orderId = document.getElementById('order-id').value;
        const statusElement = document.getElementById('status');

        if (orderId.trim() === '') {
            statusElement.textContent = 'Please enter a valid Order ID.';
            return;
        }

        statusElement.textContent = 'Fetching order and user locations...';

        // Simulate fetching order's location
        setTimeout(() => {
            orderLocation = { lat: 37.7749, lng: -122.4194 }; // Example location
            updateMap(orderLocation, 'Order Location', 'Order');
        }, 1000);

        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    updateMap(userLocation, 'Your Location', 'User');
                    calculateDistance();
                },
                () => {
                    statusElement.textContent = 'Unable to fetch your location.';
                }
            );
        } else {
            statusElement.textContent = 'Geolocation is not supported by your browser.';
        }
    }

    function updateMap(location, title, type) {
        const markerOptions = {
            position: location,
            map: map,
            title: title,
        };

        if (type === 'User') {
            if (userMarker) userMarker.setMap(null);
            userMarker = new google.maps.Marker(markerOptions);
        } else if (type === 'Order') {
            if (orderMarker) orderMarker.setMap(null);
            orderMarker = new google.maps.Marker(markerOptions);
        }

        map.setCenter(location);
    }

    function calculateDistance() {
        if (userLocation && orderLocation) {
            const userLatLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);
            const orderLatLng = new google.maps.LatLng(orderLocation.lat, orderLocation.lng);
            const distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, orderLatLng);

            document.getElementById('status').textContent =
                `Distance to your order: ${(distance / 1000).toFixed(2)} km.`;
        }
    }


<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry&callback=initMap">
</script>
