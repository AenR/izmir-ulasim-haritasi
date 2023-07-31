// Function to fetch the data from the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Function to populate the dropdown with the fetched data sorted by "İstasyonSirasi"
async function populateDropdown(dropdownId, url) {
    const jsonData = await fetchData(url);

    // Sort the stations based on "İstasyonSirasi"
    jsonData.sort((a, b) => a.IstasyonSirasi - b.IstasyonSirasi);

    const dropdown = document.getElementById(dropdownId);

    jsonData.forEach(station => {
        const option = document.createElement("option");
        option.value = station.IstasyonId;
        option.textContent = station.IstasyonAdi;
        dropdown.appendChild(option);
    });

    // Add an event listener to the dropdown to handle selection change
    dropdown.addEventListener("change", handleStationSelection);
}

// Function to handle station selection change
async function handleStationSelection() {
    const departureStationId = document.getElementById("departureStationDropdown").value;
    const arrivalStationId = document.getElementById("arrivalStationDropdown").value;

    // Check if both departure and arrival stations are selected
    if (!departureStationId || !arrivalStationId) return;

    const timeTableBody = document.getElementById("timeTableBody");
    timeTableBody.innerHTML = "Loading times...";

    const departureTimesUrl = `https://openapi.izmir.bel.tr/api/izban/sefersaatleri/${departureStationId}/${arrivalStationId}`;

    const departureTimesData = await fetchData(departureTimesUrl);

    const arrivalTimesUrl = `https://openapi.izmir.bel.tr/api/izban/sefersaatleri/${arrivalStationId}/${departureStationId}`;

    const arrivalTimesData = await fetchData(arrivalTimesUrl);

    timeTableBody.innerHTML = ""; // Clear previous content

    const formatTime = (timeString) => {
        const [hours, minutes, _] = timeString.split(":");
        return `${hours}:${minutes}`;
    };

    if (departureTimesData && departureTimesData.length > 0 && arrivalTimesData && arrivalTimesData.length > 0) {
        // Ensure both departure and arrival times are available

        const maxRows = Math.max(departureTimesData.length, arrivalTimesData.length);

        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement("tr");

            const departureCell = document.createElement("td");
            if (i < departureTimesData.length) {
                departureCell.textContent = formatTime(departureTimesData[i].HareketSaati);
            } else {
                departureCell.textContent = "";
            }
            row.appendChild(departureCell);

            const arrivalCell = document.createElement("td");
            if (i < arrivalTimesData.length) {
                arrivalCell.textContent = formatTime(arrivalTimesData[i].VarisSaati);
            } else {
                arrivalCell.textContent = "";
            }
            row.appendChild(arrivalCell);

            timeTableBody.appendChild(row);
        }
    } else {
        timeTableBody.textContent = "No times found.";
    }
}

populateDropdown("departureStationDropdown", "https://openapi.izmir.bel.tr/api/izban/istasyonlar");
populateDropdown("arrivalStationDropdown", "https://openapi.izmir.bel.tr/api/izban/istasyonlar");