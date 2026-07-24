# Portofolio — Hayqal Akbar Rizky Iskandar

Situs portofolio satu halaman. HTML, CSS, dan JavaScript murni tanpa framework
atau proses build. Buka `index.html` di peramban dan situs langsung berjalan.

## Struktur berkas

```
portfolio-hayqal/
├── index.html          Seluruh konten halaman
├── css/style.css       Gaya dan design token
├── js/main.js          Navigasi, filter, lightbox, animasi reveal
├── assets/
│   ├── img/            Foto profil dan tangkapan layar proyek
│   ├── projects/       Dokumen proyek dan gambar pendukungnya
│   ├── cv/             Berkas CV untuk diunduh
│   └── certificates/   Berkas sertifikat (21 PDF)
└── README.md
```

## Mengubah isi

**Teks, tautan, dan data diri** — semuanya ada di `index.html`. Cari nama bagian
lewat komentar besar seperti `<!-- ═══ ABOUT -->`.

**Warna dan tipografi** — ubah nilai di blok `:root` pada `css/style.css`:

```css
--ink:    #0B1017;   /* latar utama */
--amber:  #F2B441;   /* aksen utama */
--cyan:   #56C7D6;   /* aksen sekunder */
```

## Menambah proyek baru

Salin satu blok `<article class="card ...">` di bagian Proyek, lalu ganti isinya.
Atribut `data-cat` menentukan proyek muncul di filter mana — nilainya harus cocok
dengan `data-filter` pada tombol filter (`dashboard`, `analysis`, atau `product`).

Untuk proyek berupa dokumen PDF, letakkan berkasnya di `assets/projects/`. Gambar
pratinjaunya bisa dibuat dari halaman PDF dengan perintah:

```bash
pdftoppm -png -r 90 -f 2 -l 2 nama-dokumen.pdf pratinjau
```

Untuk kategori baru, tambahkan tombol filter:

```html
<button class="filter" type="button" data-filter="ml" aria-pressed="false">Machine Learning</button>
```

lalu beri `data-cat="ml"` pada kartu yang sesuai.

## Sertifikat

Dua puluh satu berkas sertifikat tersimpan di `assets/certificates/` dan tertaut
dari halaman. Mengkliknya membuka PDF asli di tab baru.

Untuk menambah sertifikat baru, salin satu blok `<a class="cert" ...>` lalu
sesuaikan `href`, nama, dan keterangannya. Kode verifikasi Dicoding ditulis di
elemen `cert__code` — hapus baris itu untuk sertifikat yang tidak punya kode.

```html
<a class="cert" href="assets/certificates/nama-berkas.pdf" target="_blank" rel="noopener">
  <div class="cert__mark"> ... ikon SVG ... </div>
  <div class="cert__info">
    <div class="cert__name">Nama sertifikat</div>
    <div class="cert__meta">Penerbit · Tanggal · Durasi</div>
    <div class="cert__code">KODEVERIFIKASI</div>
  </div>
</a>
```

Jangan lupa perbarui angka pada `cert-group__count` dan statistik di hero.

## Mengganti CV

Timpa berkas di `assets/cv/CV_Hayqal_Akbar_Rizky_Iskandar.pdf`. Jika nama berkas
berubah, perbarui juga `href` pada tombol "Unduh CV" di `index.html`.

## Publikasi ke GitHub Pages

1. Buat repositori baru bernama `Hayqal1.github.io`
2. Unggah seluruh isi folder ini ke akar repositori
3. Buka **Settings → Pages**, pilih branch `main` dan folder `/ (root)`
4. Situs terbit di `https://Hayqal1.github.io`

Setelah terbit, ganti `og:image` di `index.html` menjadi URL lengkap agar
pratinjau muncul saat tautan dibagikan:

```html
<meta property="og:image" content="https://Hayqal1.github.io/assets/img/profile.png">
```

## Catatan optimasi

Berkas gambar saat ini berformat PNG berukuran 200–730 KB. Untuk memuat lebih
cepat, kompres ke WebP dengan [Squoosh](https://squoosh.app) — ukurannya bisa
turun hingga 80% tanpa perbedaan kualitas yang terlihat.

## Aksesibilitas

Situs ini sudah menerapkan: tautan lewati konten, indikator fokus keyboard,
label ARIA pada tombol ikon, dukungan `prefers-reduced-motion`, dan penutupan
lightbox dengan tombol Escape.
