const pintu = document.getElementById('pintu');

function bukaTutupPintu() {
  pintu.classList.toggle('terbuka');
}

pintu.addEventListener('click', bukaTutupPintu);

const tanggalAcara = new Date('2026-11-22T08:00:00+07:00').getTime();

function hitungMundur() {
  const selisih = Math.max(0, tanggalAcara - Date.now());
  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((selisih / (1000 * 60)) % 60);
  const detik = Math.floor((selisih / 1000) % 60);

  document.getElementById('hari').textContent = hari;
  document.getElementById('jam').textContent = jam;
  document.getElementById('menit').textContent = menit;
  document.getElementById('detik').textContent = detik;

  if (selisih === 0) {
    document.getElementById('countdown-title').textContent = 'Hari bahagia kami telah tiba.';
  }
}

hitungMundur();
setInterval(hitungMundur, 1000);

const formUcapan = document.getElementById('form-ucapan');
const inputNama = document.getElementById('nama');
const inputPesan = document.getElementById('pesan');
const statusUcapan = document.getElementById('status-ucapan');
let daftarUcapan = [];

function tampilkanUcapan() {
  const wadah = document.getElementById('daftar-ucapan');
  wadah.textContent = '';
  document.getElementById('jumlah-ucapan').textContent = daftarUcapan.length + ' ucapan';

  if (daftarUcapan.length === 0) {
    const kosong = document.createElement('p');
    kosong.className = 'small text-body-secondary border-top pt-3';
    kosong.textContent = 'Belum ada ucapan. Jadi yang pertama menitipkan doa, yuk!';
    wadah.appendChild(kosong);
  }

  for (let i = 0; i < daftarUcapan.length; i++) {
    const ucapan = daftarUcapan[i];
    const kartu = document.createElement('article');
    kartu.className = 'wish-item border-top py-3';
    const nama = document.createElement('h4');
    const pesan = document.createElement('p');
    nama.className = 'small fw-semibold mb-1';
    pesan.className = 'small text-body-secondary mb-0';
    nama.textContent = ucapan.nama;
    pesan.textContent = ucapan.pesan;
    kartu.appendChild(nama);
    kartu.appendChild(pesan);
    wadah.appendChild(kartu);
  }
}

formUcapan.addEventListener('submit', function (event) {
  event.preventDefault();
  const nama = inputNama.value.trim();
  const pesan = inputPesan.value.trim();

  if (!nama || !pesan) {
    statusUcapan.textContent = 'Isi nama dan ucapan terlebih dahulu, ya.';
    return;
  }

  daftarUcapan.unshift({ nama: nama, pesan: pesan });
  daftarUcapan = daftarUcapan.slice(0, 20);

  tampilkanUcapan();
  formUcapan.reset();
});

tampilkanUcapan();

const tombolHadiah = document.getElementById('buka-hadiah');
const panelHadiah = document.getElementById('panel-hadiah');
const inputNominal = document.getElementById('nominal');
const statusHadiah = document.getElementById('status-hadiah');

tombolHadiah.addEventListener('click', function () {
  if (panelHadiah.hidden) {
    panelHadiah.hidden = false;
    document.getElementById('nama-pengirim').focus();
  } else {
    panelHadiah.hidden = true;
  }
});

function pilihNominal(nominal) {
  inputNominal.value = nominal;
  statusHadiah.textContent = '';
}

document.getElementById('hadiah-50').addEventListener('click', function () {
  pilihNominal(50000);
});

document.getElementById('hadiah-100').addEventListener('click', function () {
  pilihNominal(100000);
});

document.getElementById('hadiah-250').addEventListener('click', function () {
  pilihNominal(250000);
});

document.getElementById('form-hadiah').addEventListener('submit', function (event) {
  event.preventDefault();
  const pengirim = document.getElementById('nama-pengirim').value.trim();
  const nominal = Number(inputNominal.value);

  if (!pengirim || nominal < 1000 || nominal > 100000000 || nominal % 1000 !== 0) {
    statusHadiah.textContent = 'Isi nama dan nominal yang valid terlebih dahulu, ya, harus kelipatan 1000.';
    return;
  }

  const rupiah = 'Rp' + nominal.toLocaleString('id-ID');

  statusHadiah.textContent = 'Terima kasih, ' + pengirim + ','  + rupiah + ' berhasil terkirim';
  event.target.reset();
});
