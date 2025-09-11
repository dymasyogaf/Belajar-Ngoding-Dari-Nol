// Operator dan tipe data

// 1. Tipe data
let nama = "Dymas";
let umur = "22";
let mahasiswa = true;
let hobi = ["Coding", "Adveneture"];
let alamat = {kota: "Palembang", negara: "Indonesia"};

console.log("Nama: ", nama);
console.log("Umur: ", umur);
console.log("Mahasiswa: ", mahasiswa);
console.log("Hobi: ", hobi);
console.log("Alamat: ", alamat.kota, "-", alamat.negara);

// Operator Matematika
let a =10;
let b = 3;

console.log("Penjumlahan: ", a+b);
console.log("Pengurangan: ", a-b);
console.log("Perkalian: ", a*b);
console.log("Pembagian: ", a/b);
console.log("Modulus: ", a%b);

// Operator Perbandingan
console.log("Apakah a>b ? ", a > b);
console.log("Apakah a == b ?", a == b);
console.log("Apakah a != b ?", a != b);

// Output HTML
document.getElementById("hasil").innerHTML = `
    Nama: ${nama} <br>
    Umur: ${umur} <br>
    Mahasiswa: ${mahasiswa} <br>
    Hobi: ${hobi.join(", ")} <br>
    Alamat: ${alamat.kota}, ${alamat.negara} <br><br>
    10 + 3 = ${a+b} <br>
    10 - 3 = ${a-b} <br>
    10 x 3 = ${a*b} <br>
    10 : 3 = ${a/b} <br>
    10 % 3 = ${a%b} <br>
    Apakah a>b ? ${a>b} <br>
    Apakah a == b ? ${a == b} <br>
    Apakah a != b ? ${a != b} <br>
    `;

