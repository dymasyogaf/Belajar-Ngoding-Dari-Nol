// Day 7 - Object

let hasil = "";

// 1. Membuat Object
let user = {
    nama: "Dymas Yoga",
    umur: 22,
    kota: "Bandung",
    hobi: ["Fotografi", "Traveling", "Coding"],
    kerja: {
        posisi: "Web Developer",
        perusahaan: "PT. Mencari Cinta Sejati"
    }
};

// 2. Akses properti object
hasil += `<b>Nama: </b> ${user.nama}<br>`;
hasil += `<b>Umur: </b> ${user.umur}<br>`;
hasil += `<b>Kota: </b> ${user.kota}<br>`;
hasil += `<b>Hobi: </b> ${user.hobi.join(", ")}<br>`;
hasil += `<b>Pekerjaan: </b> ${user.kerja.posisi} di  ${user.kerja.perusahaan}<br>`;

// 3. Menambah properti baru
user.status = "Aktif";
hasil += `<br><b>Status: </b> ${user.status}<br>`;

// 4. Mengubah nilai properti
user.umur = 23;
hasil += `<br><b>Umur setelah di update: </b> ${user.umur}<br>`;

// 5. Looping dalam object (for...in)
hasil += `<br><b>Data Lengkap User:</b><br>`;
for (let key in user) {
    hasil += `${key}: ${user[key]}<br>`;
}

// Output ke HTML
document.getElementById("output").innerHTML = hasil;

//  Output ke console
console.log("=== Object ===");
console.log(user);


