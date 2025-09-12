// Day 3 - Kondisi (if, else, switch)

// 1. If - Else
let usia = 18;
let grade;

if (usia >= 60) {
    grade = "Lansia";
}   else if (usia >= 18) {
    grade = "Dewasa";
}   else if (usia >= 13) {
    grade = "Remaja";
}   else {
    grade = "Anak-anak";
}

console.log("Usia:", usia, "Grade:", grade);

// 2. Switch
let hari = "Senin";
let kegiatan;

switch (hari) {
    case "Senin":
        kegiatan = "Mulai kerja / kuliah";
        break;
    case "Sabtu":
        kegiatan = "Waktu santai";
    case "Minggu":
        kegiatan = "Liburan";
        break;
    default:
        kegiatan = "Hari biasa saja";
}

console.log("Hari", hari, "-", kegiatan);

// 3. Output ke HTML
document.getElementById("output").innerHTML =`
    Usia: ${usia} <br>
    Grade: ${grade} <br><br>
    Hari: ${hari} <br>
    Kegiatan: ${kegiatan}
`;