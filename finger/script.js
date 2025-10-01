/**
 * file: script.js
 * Mengatur urutan animasi tombol menghilang dan gambar muncul/dianimasikan.
 */

document.addEventListener('DOMContentLoaded', () => {
    const handGestureContainer = document.getElementById('hand-gesture');
    const startButton = document.getElementById('startButton');
    
    if (!handGestureContainer || !startButton) {
        console.error("Salah satu elemen (gambar atau tombol) tidak ditemukan. Pastikan ID sudah benar.");
        return;
    }

    // --- LOGIKA PENCEGAHAN DOWNLOAD DENGAN JAVASCRIPT ---
    
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });

    // --- FUNGSI UTAMA UNTUK MEMULAI ANIMASI GAMBAR ---
    function startImageAnimation() {
        // 1. Pastikan kontainer gambar terlihat sepenuhnya (hapus initial-hide)
        handGestureContainer.classList.remove('initial-hide');
        handGestureContainer.classList.add('hand-gesture-ready'); // Untuk memicu transisi opacity

        // 2. Beri sedikit jeda setelah kontainer terlihat, lalu mulai animasi gambar
        // Jeda ini akan memungkinkan transisi opacity kontainer selesai sebelum gambar bergerak
        setTimeout(() => {
            // Set state awal gambar agar animasi zoom-in bisa dimulai
            handGestureContainer.classList.add('hidden');
            
            // Jeda sangat singkat untuk memastikan kelas 'hidden' diterapkan sebelum beralih ke 'shown'
            setTimeout(() => {
                handGestureContainer.classList.remove('hidden');
                handGestureContainer.classList.add('shown');
            }, 50); // Jeda kecil sebelum transisi ke 'shown'
            
        }, 600); // Jeda ini penting: berikan waktu tombol untuk memudar dulu (0.5s + buffer)
    }
    
    // --- EVENT LISTENER UNTUK TOMBOL "Coba Pencet" ---
    startButton.addEventListener('click', () => {
        // 1. Nonaktifkan tombol
        startButton.disabled = true;
        startButton.textContent = "Loading...";

        // 2. Terapkan animasi fade-out pada tombol
        startButton.classList.add('button-fade-out');
        
        // 3. Setelah tombol selesai memudar, mulai animasi gambar
        // Durasi fade-out tombol adalah 0.5s, jadi kita tambahkan sedikit buffer
        setTimeout(() => {
            startButton.style.display = 'none'; // Sembunyikan sepenuhnya setelah memudar
            startImageAnimation(); // Panggil fungsi animasi gambar
        }, 550); // Sesuaikan dengan durasi transisi opacity tombol (0.5s) + sedikit jeda
    });
    
    // --- EVENT LISTENER UNTUK MENGULANG ANIMASI (JIKA GAMBAR DIKLIK) ---
    handGestureContainer.addEventListener('click', () => {
        // Reset state
        handGestureContainer.classList.remove('shown');
        handGestureContainer.classList.add('hidden');
        
        // Mulai lagi animasi setelah jeda singkat
        setTimeout(() => {
            handGestureContainer.classList.remove('hidden');
            handGestureContainer.classList.add('shown');
        }, 100); 
    });
});