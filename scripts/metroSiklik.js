fetch('https://openapi.izmir.bel.tr/api/metro/sefersaatleri')
      .then(response => response.json())
      .then(data => {
        const seferTablosu = document.getElementById('seferTablosu');

        const haftaIciSeferleri = data.slice(0, 5);
        const cumartesiSeferleri = data.slice(5, 8);
        const pazarSeferleri = [data[data.length - 1]];

        addSeferRows(haftaIciSeferleri, 'Hafta İçi Seferleri');
        addSeferRows(cumartesiSeferleri, 'Cumartesi Seferleri');
        addSeferRows(pazarSeferleri, 'Pazar Seferleri');

        function addSeferRows(seferler, gunAdi) {
          const gunTr = document.createElement('tr');
          gunTr.innerHTML = `<th colspan="3">${gunAdi}</th>`;
          seferTablosu.appendChild(gunTr);

          seferler.forEach(item => {
            const baslangicSaati = item.BaslangicSaati;
            const bitisSaati = item.BitisSaati;
            const aralik = item.Aralik;

            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${baslangicSaati}</td><td>${bitisSaati}</td><td>${aralik} dk</td>`;

            seferTablosu.appendChild(tr);
          });
        }
      })
      .catch(error => console.error('Hata:', error));