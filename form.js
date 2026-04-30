// form.js — Logika halaman Form Pendaftaran

var members = JSON.parse(sessionStorage.getItem('members') || '[]');

var labelMap = {
    web:    'Web Development',
    mobile: 'Mobile Development',
    data:   'Data Science',
    ai:     'Artificial Intelligence'
};

document.getElementById('memberForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var nama  = document.getElementById('nama').value.trim();
    var email = document.getElementById('email').value.trim();
    var minat = document.getElementById('minat').value;

    if (!nama || !email || !minat) {
        alert('⚠️ Semua field wajib diisi!');
        return;
    }

    // Simpan ke array & sessionStorage
    var newMember = { nama: nama, email: email, minat: minat };
    members.push(newMember);
    sessionStorage.setItem('members', JSON.stringify(members));

    // Tampilkan di result box
    document.getElementById('r-nama').textContent  = nama;
    document.getElementById('r-email').textContent = email;
    document.getElementById('r-minat').textContent = labelMap[minat] || minat;
    document.getElementById('result-box').style.display = 'block';

    // Alert konfirmasi
    alert('✦ Pendaftaran Berhasil! ✦\n\nSelamat datang, ' + nama + '!\nData Anda telah tersimpan.');

    // Reset form
    this.reset();
});