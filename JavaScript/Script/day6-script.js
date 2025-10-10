// Day 6 - Array

let hasil = "";

//  1. Membuat array
let hobi = ["Coding", "Traveling", "Membaca"];

hasil += `<b>Hobi Saya:</b> ${hobi.join(", ")}<br>`;

// 2. Mengakses elemen array
hasil += `Hobi pertama: ${hobi[0]}<br>`;
hasil += `Jumlah hobi: ${hobi.length}<br>`;

// 3. Menambahkan elemen ke array
hobi.push("Fotografi");
hasil += `Setelah ditambah: ${hobi.join(", ")}<br>`;

// 4. Menghapus elemen dari array
hobi.pop();
hasil += `Setelah dihapus terakhir: ${hobi.join(", ")}<br>`;

// 5 Looping data array
hasil += `<br><br>Daftar Hobi:<br>`;
for (let i = 0; i < hobi.length; i++) {
    hasil += `${i + 1}. ${hobi[i]}<br>`;
}

// Output ke HTML
document.getElementById("output").innerHTML = hasil;

// Juga tampilkan ke console
console.log("=== Hasil Array ===");
console.log(hasil);