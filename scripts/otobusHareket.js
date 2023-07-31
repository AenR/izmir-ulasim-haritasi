async function getEshotHareketSaatleri() {
    const hat = parseInt(document.getElementById("durakno").value);

    try {
        // Fetch the "HatBaslangic" value from the API
        const hatBaslangicResponse = await fetch(`https://openapi.izmir.bel.tr/api/eshot/hatara/${hat}`, { method: 'GET' });

        if (hatBaslangicResponse.ok) {
            const hatBaslangicData = await hatBaslangicResponse.json();

            // Check if 'Hatlar' exists in the data and has at least one element
            if (hatBaslangicData.Hatlar && hatBaslangicData.Hatlar.length > 0) {
                // Get the 'HatBaslangic' value from the first element of 'Hatlar'
                const hatBaslangic = hatBaslangicData.Hatlar[0].HatBaslangic;
                // Get the 'HatBitis' value from the first element of 'Hatlar'
                const hatBitis = hatBaslangicData.Hatlar[0].HatBitis;

                // Fetch the "HareketSaatleri" from the main API
                const response = await fetch(`https://openapi.izmir.bel.tr/api/eshot/hareketsaatleri/${hat}`, { method: 'GET' });

                // İsteğin başarı durumunu kontrol edelim.
                if (response.ok) {
                    // API'den dönen verileri JSON formatından JavaScript nesnesine dönüştürüyoruz.
                    const data = await response.json();

                    // Dönen verileri istediğiniz şekilde kullanabilirsiniz.
                    displayHareketSaatleri(data, hatBaslangic, hatBitis);
                } else {
                    console.log(`API isteği başarısız. Hata kodu: ${response.status}`);
                }
            } else {
                console.log(`Hat Bilgisi bulunamadı.`);
            }
        } else {
            console.log(`Hat Bilgisi API isteği başarısız. Hata kodu: ${hatBaslangicResponse.status}`);
        }
    } catch (error) {
        console.log(`Hata oluştu: ${error}`);
    }
}

function displayHareketSaatleri(eshotHareketSaatleri, hatBaslangic, hatBitis) {
    const durakInfoDiv = document.getElementById("durakInfo");
    durakInfoDiv.innerHTML = "";

    if (eshotHareketSaatleri) {
        // Create the container div for the tables using Bootstrap grid system
        const tableContainer = document.createElement("div");
        tableContainer.classList.add("row", "my-3");

        // Function to create and append a table to the container div
        function createAndAppendTable(headerText, data) {
            const tableDiv = document.createElement("div");
            tableDiv.classList.add("col-md-4"); // Use Bootstrap's 'col-md-4' class for medium-sized screens

            // Create and populate header row
            const header = document.createElement("h3");
            header.textContent = headerText;
            header.style.textAlign = "center";
            header.style.fontWeight = "bold";
            tableDiv.appendChild(header);

            // Create the table element
            const table = document.createElement("table");
            table.classList.add("table", "table-striped");

            // Create and populate header row for Gidiş ve Dönüş Saatleri
            const headerRow = table.insertRow();
            const gidisHeaderCell = headerRow.insertCell();
            const donusHeaderCell = headerRow.insertCell();
            gidisHeaderCell.textContent = `${hatBaslangic} - Gidiş`;
            donusHeaderCell.textContent = `${hatBitis} - Dönüş`;

            gidisHeaderCell.style.textAlign = "center";
            donusHeaderCell.style.textAlign = "center";
            gidisHeaderCell.style.fontWeight = "bold";
            donusHeaderCell.style.fontWeight = "bold";

            // Populate the table rows
            for (const i of data) {
                const row = table.insertRow();
                const gidisCell = row.insertCell();
                const donusCell = row.insertCell();
                gidisCell.textContent = i['GidisSaat'];
                donusCell.textContent = i['DonusSaat'];

                gidisCell.style.textAlign = "center";
                donusCell.style.textAlign = "center";
            }

            // Append the table to the div
            tableDiv.appendChild(table);
            tableContainer.appendChild(tableDiv);
        }

        // Create and append tables for Hafta İçi, Cumartesi, and Pazar
        createAndAppendTable(`Hafta İçi`, eshotHareketSaatleri["HareketSaatleriHici"]);
        createAndAppendTable(`Cumartesi`, eshotHareketSaatleri["HareketSaatleriCtesi"]);
        createAndAppendTable(`Pazar`, eshotHareketSaatleri["HareketSaatleriPazar"]);

        // Append the table container to the div
        durakInfoDiv.appendChild(tableContainer);
    }
}