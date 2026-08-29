let hargaDasar = 3500000;
let hariDasar = 4;
let namaTipe = "Pro Landing Page";

const tombolTipe = document.querySelectorAll('.tombol-tipe');
const checkboxes = document.querySelectorAll('.fitur-tambahan');
const elemenHarga = document.getElementById('nilai-harga');
const elemenWaktu = document.getElementById('nilai-waktu');
const tombolKonsultasi = document.getElementById('tombol-konsultasi');

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(angka);
}

function hitungTotal() {
  let totalHarga = hargaDasar;
  let totalHari = hariDasar;
  const daftarFiturDipilih = [];

  checkboxes.forEach((cb) => {
    if (cb.checked) {
      totalHarga += parseInt(cb.dataset.harga, 10);
      totalHari += parseInt(cb.dataset.hari, 10);
      const namaFitur = cb.parentElement.querySelector('.nama-fitur').textContent;
      daftarFiturDipilih.push(namaFitur);
    }
  });

  elemenHarga.textContent = formatRupiah(totalHarga);
  elemenWaktu.textContent = `${totalHari} Hari Kerja`;

  // Generate WhatsApp Message Link
  const pesanWa = `Halo Mas Bagas Pratama, saya ingin konsultasi pembuatan proyek:\n- Jenis: ${namaTipe}\n- Fitur: ${daftarFiturDipilih.join(', ') || 'Standar'}\n- Estimasi: ${formatRupiah(totalHarga)} (${totalHari} Hari Kerja)\n\nBisa kita jadwalkan diskusi lebih lanjut?`;
  tombolKonsultasi.href = `https://wa.me/6281234567890?text=${encodeURIComponent(pesanWa)}`;
}

tombolTipe.forEach((btn) => {
  btn.addEventListener('click', () => {
    tombolTipe.forEach((b) => b.classList.remove('aktif'));
    btn.classList.add('aktif');
    hargaDasar = parseInt(btn.dataset.harga, 10);
    hariDasar = parseInt(btn.dataset.hari, 10);
    namaTipe = btn.querySelector('.tipe-nama').textContent;
    hitungTotal();
  });
});

checkboxes.forEach((cb) => {
  cb.addEventListener('change', hitungTotal);
});

// Inisialisasi awal
hitungTotal();
