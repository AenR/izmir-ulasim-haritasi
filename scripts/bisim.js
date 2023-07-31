// Function to fetch data from the API and display the results in the table
async function fetchDataAndDisplay() {
    const response = await fetch('https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar');
    const data = await response.json();

    if (data.status === 'ok' && data.stations) {
        const tableBody = document.getElementById('table-body');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Show all the stations except the first three from the top and the last two from the bottom
        const totalStations = data.stations.length;
        for (let i = 3; i < totalStations - 2; i++) {
            const station = data.stations[i];
            const stationName = station.IstasyonAdi;
            const bikeCount = station.BisikletSayisi;

            const row = tableBody.insertRow();
            const cellStationName = row.insertCell(0);
            const cellBikeCount = row.insertCell(1);

            cellStationName.textContent = stationName;
            cellStationName.classList.add("text-center"); // Center-align the station name cell
            cellBikeCount.textContent = bikeCount;
            cellBikeCount.classList.add("text-center"); // Center-align the bike count cell
        }
    } else {
        console.error('Failed to fetch data from the API');
    }
}

// Function to refresh the table
function refreshTable() {
    fetchDataAndDisplay();
}

// Initial data load on page load
fetchDataAndDisplay();