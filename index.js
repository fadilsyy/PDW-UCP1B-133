// index.js — Logika halaman Beranda
// Memuat data anggota baru dari sessionStorage (dikirim oleh form.html)

const badgeMap = {
    web:    'badge-web',
    mobile: 'badge-mobile',
    data:   'badge-data',
    ai:     'badge-ai'
};

const labelMap = {
    web:    'Web Development',
    mobile: 'Mobile Development',
    data:   'Data Science',
    ai:     'Artificial Intelligence'
};

const saved = JSON.parse(sessionStorage.getItem('members') || '[]');
const tbody  = document.getElementById('newEntries');
let offset   = 5; // lanjut dari baris statis terakhir (#4)

saved.forEach(function(m, i) {
    const tr          = document.createElement('tr');
    const badgeClass  = badgeMap[m.minat] || 'badge-web';
    const label       = labelMap[m.minat]  || m.minat;

    tr.innerHTML =
        '<td>' + (offset + i) + '</td>' +
        '<td>' + m.nama  + '</td>' +
        '<td>' + m.email + '</td>' +
        '<td><span class="badge-minat ' + badgeClass + '">' + label + '</span></td>';

    tbody.appendChild(tr);
});