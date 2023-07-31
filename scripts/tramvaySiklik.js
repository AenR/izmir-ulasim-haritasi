function listele() {
    // Tabloyu boşalt
    const seferTablosu = document.getElementById('seferTablosu');
    seferTablosu.innerHTML = '';

    const karsitramSelected = document.getElementById('karsitram').checked;
    const konaktramSelected = document.getElementById('konaktram').checked;

    if (karsitramSelected) {
        fetch('https://openapi.izmir.bel.tr/api/tramvay/seferler/3')
            .then(response => response.json())
            .then(data => {
                const seferTablosu = document.getElementById('seferTablosu');

                let rowCount = 0;
                const rowsPerGroup = 2;

                data.forEach((item, index) => {
                    const baslangicSaati = item.BaslangicSaati;
                    const bitisSaati = item.BitisSaati;
                    const aralik = item.Aralik;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${baslangicSaati}</td><td>${bitisSaati}</td><td>${aralik} dk</td>`;

                    if (rowCount === 0) {
                        const groupTitle = document.createElement('th');
                        groupTitle.setAttribute('colspan', '3');

                        if (index === 0) {
                            groupTitle.textContent = 'Hafta İçi Seferleri';
                        } else if (index === 2) {
                            groupTitle.textContent = 'Cumartesi Seferleri';
                        } else if (index === 4) {
                            groupTitle.textContent = 'Pazar Seferleri';
                        }

                        const groupTr = document.createElement('tr');
                        groupTr.appendChild(groupTitle);
                        seferTablosu.appendChild(groupTr);
                    }

                    seferTablosu.appendChild(tr);

                    rowCount++;
                    if (rowCount === rowsPerGroup) {
                        rowCount = 0;
                        const groupTr = document.createElement('tr');
                    }
                });
            })
            .catch(error => console.error('Hata:', error));
    } else if (konaktramSelected) {
        fetch('https://openapi.izmir.bel.tr/api/tramvay/seferler/1')
            .then(response => response.json())
            .then(data => {
                const seferTablosu = document.getElementById('seferTablosu');

                let rowCount = 0;
                const rowsPerGroup = 1;

                data.forEach((item, index) => {
                    const baslangicSaati = item.BaslangicSaati;
                    const bitisSaati = item.BitisSaati;
                    const aralik = item.Aralik;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${baslangicSaati}</td><td>${bitisSaati}</td><td>${aralik} dk</td>`;

                    if (rowCount === 0) {
                        const groupTitle = document.createElement('th');
                        groupTitle.setAttribute('colspan', '3');

                        if (index === 0) {
                            groupTitle.textContent = 'Hafta İçi Seferleri';
                        } else if (index === 1) {
                            groupTitle.textContent = 'Cumartesi Seferleri';
                        } else if (index === 2) {
                            groupTitle.textContent = 'Pazar Seferleri';
                        }

                        const groupTr = document.createElement('tr');
                        groupTr.appendChild(groupTitle);
                        seferTablosu.appendChild(groupTr);
                    }

                    seferTablosu.appendChild(tr);

                    rowCount++;
                    if (rowCount === rowsPerGroup) {
                        rowCount = 0;
                        const groupTr = document.createElement('tr');
                    }
                });
            })
            .catch(error => console.error('Hata:', error));
    }
}