// Day 4 - Looping

let hasil = "";

// 1. For Loop (ulang dari 1 - 5)
for (let i = 1; i <= 100; i++) {
    hasil += `For Loop ke-${i} <br>`;
}

// 2. while loop (ulang selama kondisi benar)
let j = 1;
while (j <=3) {
    hasil += `while Loop ke-${j} <br>`;
    j++;
}

// 3. Do.. While loop (jalan minimal sekali)
let k = 1; 
do {
    hasil += `Do...While loop ke-${k} <br>`
    k++;
} while (k <= 2);

// Tampilkan hasil ke HTML
document.getElementById("output").innerHTML = hasil;

//  Juga tampilkan ke console
console.log("=== Hasil Looping ===");
console.log(hasil);