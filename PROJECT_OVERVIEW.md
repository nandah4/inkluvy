# 🌐 Inkluvy — Project Overview & Architecture Blueprint

> **Smart City**  

---

g

## 🤖 5. Panduan Konteks AI Model (AI Agent Directives)

Saat berinteraksi, memodifikasi, atau menganalisis *codebase* projek **Inkluvy**, AI Model **HARUS MEMPERHATIKAN** panduan etos berikut:

1. **Aksesibilitas & Kontras Tinggi (High Contrast UX)**:
   - Gunakan skema warna yang kontras, elegan, dan ramah bagi penderita gangguan penglihatan.
   - Warna aksen utama menggunakan token `primary` (`#79B9F3` / Tailwind `text-primary`, `bg-primary`).
   - Kelengkungan komponen menggunakan border radius presisi (`rounded-2xl` untuk modal/container outer dan `rounded-xl` untuk inner cards/buttons).

2. **Penggunaan Nama Akun & Reporter**:
   - Untuk demonstrasi profil reporter aktif pada form laporan dan modal SOS, **selalu gunakan nama `Syahla Aulia`** dengan role `Verified Reporter / Wheelchair Commuter`.

3. **Prinsip Emergency SOS (Kecepatan & Waktu Kritis)**:
   - Fitur SOS mengutamakan **Zero-Barrier Input** (tanpa mewajibkan ketikan form). Opsi deskripsi bersifat opsional (`Emergency Details (Optional)`).
   - Tombol utama SOS menggunakan CTA tegas: **`[ Need Help ]`** berwarna merah solid (`bg-red-600`).

4. **Standar Bahasa UI**:
   - Seluruh form interaktif (Report Modal, SOS Modal, Community Form) menggunakan **Bahasa Inggris** yang bersih dan profesional.
   - Dokumentasi proposal dan penjelasan teknis disajikan dalam Bahasa Indonesia yang formal.

---
