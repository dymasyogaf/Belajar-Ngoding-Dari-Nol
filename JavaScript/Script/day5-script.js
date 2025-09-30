// Day 5 - Function

let hasil = "";

// 1. Function biasa
function sapa(nama) {
    return `Halo, ${nama}!<br>`;
}

hasil += sapa("Dymas");
hasil += sapa("Yoga");

// 2. Function dengan parameter dan return
function tambah(a, b) {
    return a + b;
}

let penjumlahan = tambah(10, 5);
hasil += `10 + 5 = ${penjumlahan} <br>`;

// 3. Function expression (disimpan ke variabel)
const kali = function(a, b) {
    return a * b;
};

hasil += `4 * 3 = ${kali(4, 3)}<br>`;

// 4. Arrow function (lebih singkat)
const bagi = (a, b) => a / b;

hasil += `20 / 4 = ${bagi(20, 4)}<br>`;

// Output ke HTML
document.getElementById("output").innerHTML = hasil;

// Juga tampilkan ke console
console.log("=== Hasil Function ===");
console.log(hasil);