// Makanan

let makanan = ["Sate", "Bakso", "Ayam Geprek"];

let hasil =`<b>Makanan Favorit Saya:</b> ${makanan.join(", ")}<br>`;

//  Mengakses elemen array
hasil += `Saya paling suka makan ${makanan[0]} dan ${makanan [makanan.length -1]} <br>`;
hasil += `Jumlah makanan: ${makanan.length}<br>`;

// Menambahkan elemen ke array
makanan.push("Nasi Goreng");
hasil += `Setelah ditambah: ${makanan.join(", ")}<br>`;

// Menghapus elemen dari array
makanan.pop();
hasil += `Setelah dihapus terakhir: ${makanan.join(", ")}<br>`;

// Looping data array
hasil += `<br><br>Daftar Makanan:<br>`;
for (let i = 0; i < makanan.length; i++) {
    hasil += `${i + 1}. ${makanan[i]}<br>`;
}

// Output ke HTML
document.getElementById("output").innerHTML = hasil;

// Juga tampilkan ke console
console.log("=== Hasil Makanan ===");
console.log(hasil);
