function get_en_yakin_durak() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `https://openapi.izmir.bel.tr/api/eshot/yakinduraklar/${latitude}/${longitude}`;

    // Make an API call using fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const enyakinDiv = document.getElementById("enyakin");
            enyakinDiv.innerHTML = ""; // Clear existing data

            if (data && data.length > 0) {
                const table = document.createElement("table");
                table.classList.add("table", "table-striped");

                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");
                const durakAdiHeader = document.createElement("th");
                const xKoordinatiHeader = document.createElement("th");
                const yKoordinatiHeader = document.createElement("th");
                durakAdiHeader.textContent = "Durak Adı";
                xKoordinatiHeader.textContent = "X Koordinatı";
                yKoordinatiHeader.textContent = "Y Koordinatı";
                headerRow.appendChild(durakAdiHeader);
                headerRow.appendChild(xKoordinatiHeader);
                headerRow.appendChild(yKoordinatiHeader);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                data.forEach(durak => {
                    const row = document.createElement("tr");
                    const durakAdiCell = document.createElement("td");
                    const xKoordinatiCell = document.createElement("td");
                    const yKoordinatiCell = document.createElement("td");
                    durakAdiCell.textContent = durak.Adi;
                    xKoordinatiCell.textContent = durak.KoorX;
                    yKoordinatiCell.textContent = durak.KoorY;
                    row.appendChild(durakAdiCell);
                    row.appendChild(xKoordinatiCell);
                    row.appendChild(yKoordinatiCell);
                    tbody.appendChild(row);
                });

                table.appendChild(tbody);
                enyakinDiv.appendChild(table);
            } else {
                enyakinDiv.textContent = "Yakın durak bulunamadı.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}