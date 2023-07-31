function getEshotHareketSaatleri() {
    const durak = parseInt(document.getElementById("durakno").value);
    const durakInfoElement = document.getElementById("durakInfo");
  
    // Send a GET request to the server endpoint to get the ESHOT hareket saatleri
    axios.get(`https://openapi.izmir.bel.tr/api/eshot/duraktangecenhatlar/${durak}`)
        .then(response => {
            // Check if the API request is successful
            if (response.status === 200) {
                const data = response.data;
                durakInfoElement.innerHTML = ""; // Clear existing data
  
                if (data.Hatlar.length > 0) {
                  const table = document.createElement("table");
                  table.classList.add("table", "table-striped");
  
                  const thead = document.createElement("thead");
                  const headerRow = document.createElement("tr");
                  const hatNoHeader = document.createElement("th");
                  const hatAdiHeader = document.createElement("th");
                  hatNoHeader.textContent = "Hat No";
                  hatAdiHeader.textContent = "Hat Adı";
                  headerRow.appendChild(hatNoHeader);
                  headerRow.appendChild(hatAdiHeader);
                  thead.appendChild(headerRow);
                  table.appendChild(thead);
  
                  const tbody = document.createElement("tbody");
                  data.Hatlar.forEach(item => {
                    const row = document.createElement("tr");
                    const hatNoCell = document.createElement("td");
                    const hatAdiCell = document.createElement("td");
                    hatNoCell.textContent = item.HatNo;
                    hatAdiCell.textContent = item.Adi;
                    row.appendChild(hatNoCell);
                    row.appendChild(hatAdiCell);
                    tbody.appendChild(row);
                  });
  
                  table.appendChild(tbody);
                  durakInfoElement.appendChild(table);
                } else {
                  durakInfoElement.textContent = "Sonuç Bulunamadı";
                }
            } else {
                console.log(`API isteği başarısız. Hata kodu: ${response.status}`);
            }
        })
        .catch(error => {
            console.log(`Hata oluştu: ${error}`);
        });
  }
  