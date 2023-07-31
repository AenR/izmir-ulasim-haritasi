function get_yaklasan_otobusler() {
    const durak = parseInt(document.getElementById('durak').value);

    // Replace the API URL with the correct one if needed
    const apiUrl = `https://openapi.izmir.bel.tr/api/iztek/duragayaklasanotobusler/${durak}`;

    fetch(apiUrl, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API isteği başarısız. Hata kodu: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const otobuslerDiv = document.getElementById('otobusler');
            otobuslerDiv.innerHTML = ""; // Clear previous results

            if (data && data.length > 0) {
                // Create the table element
                const table = document.createElement('table');

                table.classList.add('table', 'table-striped');

                // Create the table header (thead) and row
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');

                // Create header cells
                const hatNumarasiHeader = document.createElement('th');
                hatNumarasiHeader.textContent = "Hat Numarası";
                headerRow.appendChild(hatNumarasiHeader);

                const hatAdiHeader = document.createElement('th');
                hatAdiHeader.textContent = "Hat Adı";
                headerRow.appendChild(hatAdiHeader);

                const kalanDurakHeader = document.createElement('th');
                kalanDurakHeader.textContent = "Kalan Durak Sayısı";
                headerRow.appendChild(kalanDurakHeader);

                // Append the header row to the table header
                thead.appendChild(headerRow);

                // Append the table header to the table
                table.appendChild(thead);

                // Create the table body (tbody)
                const tbody = document.createElement('tbody');

                data.forEach(item => {
                    const hatNumarasi = item["HatNumarasi"];
                    const kalan_durak_sayisi = item["KalanDurakSayisi"];
                    const hat_adi = item["HatAdi"];

                    // Create a new row for each item in the data
                    const row = document.createElement('tr');

                    // Create cells for the data
                    const hatNumarasiCell = document.createElement('td');
                    hatNumarasiCell.textContent = hatNumarasi;
                    row.appendChild(hatNumarasiCell);

                    const hatAdiCell = document.createElement('td');
                    hatAdiCell.textContent = hat_adi;
                    row.appendChild(hatAdiCell);

                    const kalanDurakCell = document.createElement('td');
                    kalanDurakCell.textContent = kalan_durak_sayisi;
                    row.appendChild(kalanDurakCell);

                    // Append the row to the table body
                    tbody.appendChild(row);
                });

                // Append the table body to the table
                table.appendChild(tbody);

                // Append the table to the otobuslerDiv
                otobuslerDiv.appendChild(table);
            } else {
                otobuslerDiv.textContent = "Sonuç bulunamadı.";
            }
        })
        .catch(error => {
            const otobuslerDiv = document.getElementById('otobusler');
            otobuslerDiv.textContent = `Hata oluştu: ${error.message}`;
        });
}
