function formatKartNo(input) {
    // Remove all existing hyphens and non-digit characters from the input
    let cleanedInput = input.replace(/-/g, '').replace(/\D/g, '');

    // Add hyphens every 5 characters
    let formattedInput = '';
    for (let i = 0; i < cleanedInput.length; i++) {
        if (i > 0 && i % 5 === 0) {
            formattedInput += '-';
        }
        formattedInput += cleanedInput[i];
    }

    // Set the formatted value back to the input field
    document.getElementById('kartno').value = formattedInput;
}

function getIzmirimKartBakiyeSorgu() {
    const kartno = document.getElementById("kartno").value;
    const apiUrl = `https://openapi.izmir.bel.tr/api/iztek/bakiyesorgulama/${kartno}`;
  
    axios.get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          const bakiye = data.UlasimKartBakiyesi.MevcutBakiye;
          const sonYuklemeTarih = data.UlasimKartBakiyesi.SonYuklemeTarihi;
          const sonYuklenenTutar = data.UlasimKartBakiyesi.SonYuklenenTutar;
          const sonIslemTarih = data.UlasimKartBakiyesi.SonIslemTarihi;
          const sonHarcananTutar = data.UlasimKartBakiyesi.SonHarcananTutar;
          document.getElementById("bakiye").textContent = `Bakiye: ${bakiye}₺`;
          document.getElementById("sonYuklemeTarih").textContent = `Son Yükleme Tarihi: ${sonYuklemeTarih}`;
          document.getElementById("sonYuklenenTutar").textContent = `Son Yükleme Tutarı: ${sonYuklenenTutar}₺`;
          document.getElementById("sonIslemTarih").textContent = `Son İşlem Tarihi: ${sonIslemTarih}`;
          document.getElementById("sonHarcananTutar").textContent = `Son Harcanan Tutar: ${sonHarcananTutar}₺`;
        } else {
          console.log(`API isteği başarısız. Hata kodu: ${response.status}`);
        }
      })
      .catch((error) => {
        console.log(`Hata oluştu: ${error.message}`);
      });
  }

  document.getElementById('kartno').addEventListener('input', function (event) {
    formatKartNo(event.target.value);
});
  