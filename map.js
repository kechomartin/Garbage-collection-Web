// Ensure this is in a script tag loaded AFTER the Google Maps API script
// And before any other scripts that depend on initMap
let map;
let userMarker; // To display the user's location
const agentMarkers = {}; // To store markers for agents (key: agent ID)

function initMap() {
    // Default location (e.g., Nairobi, Kenya)
    const defaultLocation = { lat: -1.286389, lng: 36.817223 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
    });

    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userPos); // Center map on user
                userMarker = new google.maps.Marker({
                    position: userPos,
                    map: map,
                    title: "Your Location",
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue dot for user
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });
                new google.maps.InfoWindow({
                    content: "You are here!"
                }).open(map, userMarker);

                // Start watching for real-time user location changes
                watchUserLocation();
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }

    // Event listener for the "Share My Location" button
    document.getElementById('shareLocationBtn').addEventListener('click', shareUserLocation);

    // TODO: Fetch and display nearby agents (initial load)
    fetchNearbyAgents();
}

function handleLocationError(browserHasGeolocation, pos) {
    new google.maps.InfoWindow({
        content: browserHasGeolocation
            ? "Error: The Geolocation service failed. Please enable location services."
            : "Error: Your browser doesn't support Geolocation."
    }).open(map);
}

function watchUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                if (userMarker) {
                    userMarker.setPosition(userPos); // Update marker position
                } else {
                    userMarker = new google.maps.Marker({
                        position: userPos,
                        map: map,
                        title: "Your Location",
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            scaledSize: new google.maps.Size(40, 40)
                        }
                    });
                }
                // Optionally, recenter the map on the user if they move significantly
                // map.setCenter(userPos);

                // TODO: Send updated user location to backend (for agents to see, if applicable)
                sendUserLocationToBackend(userPos);

            },
            (error) => {
                console.error("Error watching location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0 // No cached position
            }
        );
    }
}

function shareUserLocation() {
    // This function will explicitly send the user's current location to the backend
    // for agents to potentially see.
    if (userMarker && userMarker.getPosition()) {
        const userPos = {
            lat: userMarker.getPosition().lat(),
            lng: userMarker.getPosition().lng(),
        };
        sendUserLocationToBackend(userPos, true); // `true` indicates explicit sharing
        alert("Your location is being shared with nearby agents!");
    } else {
        alert("Cannot share location. Please enable location services and try again.");
    }
}

// Dummy function for sending user location to backend (you'll implement this)
function sendUserLocationToBackend(location, explicitShare = false) {
    console.log("Sending user location to backend:", location, "Explicit:", explicitShare);
    // In a real app, you would make an AJAX/Fetch request to your backend:
    /*
    fetch('/api/user/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_AUTH_TOKEN' // If authentication is used
        },
        body: JSON.stringify({
            latitude: location.lat,
            longitude: location.lng,
            share: explicitShare // Indicate if it's an explicit share
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User location updated on server:', data);
    })
    .catch(error => {
        console.error('Error updating user location on server:', error);
    });
    */
}

// Dummy function for fetching nearby agents (you'll implement this)
function fetchNearbyAgents() {
    console.log("Fetching nearby agents...");
    // In a real app, you would make an AJAX/Fetch request to your backend:
    /*
    fetch('/api/agents/nearby') // You might pass user's current location here
    .then(response => response.json())
    .then(agents => {
        updateAgentMarkers(agents);
    })
    .catch(error => {
        console.error('Error fetching nearby agents:', error);
    });
    */

    // For demonstration, let's use some dummy data:
    const dummyAgents = [
        { id: 'agent1', name: 'Agent John', lat: -1.2950, lng: 36.8200 },
        { id: 'agent2', name: 'Agent Jane', lat: -1.2700, lng: 36.8000 },
        { id: 'agent3', name: 'Agent Mike', lat: -1.2800, lng: 36.8300 }
    ];
    updateAgentMarkers(dummyAgents);
}

function updateAgentMarkers(agents) {
    // Remove old markers that are no longer in the list
    for (const agentId in agentMarkers) {
        if (!agents.some(agent => agent.id === agentId)) {
            agentMarkers[agentId].setMap(null); // Remove from map
            delete agentMarkers[agentId]; // Remove from our tracking object
        }
    }

    // Add/update new/existing markers
    agents.forEach(agent => {
        const agentPos = { lat: agent.lat, lng: agent.lng };
        if (agentMarkers[agent.id]) {
            // Update existing marker position
            agentMarkers[agent.id].setPosition(agentPos);
        } else {
            // Create new marker
            agentMarkers[agent.id] = new google.maps.Marker({
                position: agentPos,
                map: map,
                title: agent.name,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green dot for agents
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
            // Add info window for agent
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${agent.name}</h3><p>Status: Available</p>` // Add more agent info
            });
            agentMarkers[agent.id].addListener('click', () => {
                infoWindow.open(map, agentMarkers[agent.id]);
            });
        }
    });
}


// --- Backend/Real-time considerations (beyond current frontend code) ---

// This part assumes you have a backend server
// For real-time updates without page refresh, you'd use WebSockets
// Example using a hypothetical WebSocket connection:
/*
let ws;
function connectWebSocket() {
    ws = new WebSocket('ws://localhost:3000/ws'); // Replace with your WebSocket server URL

    ws.onopen = () => {
        console.log('WebSocket connected');
        // On connection, you might send initial user location or request agent locations
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'agentUpdate') {
            updateAgentMarkers([data.agent]); // Update a single agent
        } else if (data.type === 'allAgents') {
            updateAgentMarkers(data.agents); // Update all agents
        }
        // Handle other message types (e.g., user location requests from agents)
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected. Reconnecting in 5 seconds...');
        setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

// Call this to initiate WebSocket connection if you implement real-time
// connectWebSocket();
*/