// Load data dari localstorage
let allRestos = JSON.parse(localStorage.getItem('myRestoMenu')) || [];
const wishlistElement = document.getElementById('wishlist');
const modalOverlay = document.getElementById('modalOverlay');

// Render data saat pertama dibuka
renderList(allRestos);

// Fungsi untuk buka/tutup Modal Input
function toggleModal() {
    modalOverlay.classList.toggle('show');
}

// Menangani Klik tombol Tambah di dalam Modal
document.getElementById('addBtn').addEventListener('click', function() {
    const name = document.getElementById('restoName').value;
    const category = document.getElementById('restoCategory').value;
    const price = document.getElementById('restoPrice').value;
    const maps = document.getElementById('restoMaps').value;

    if (name === '' || category === '') {
        alert("Nama dan Kategori harus diisi menu utama!");
        return;
    }

    const newResto = { id: Date.now(), name, category, price, maps };
    allRestos.push(newResto);
    saveAndRender();

    // Reset dan Tutup Modal
    document.getElementById('restoName').value = '';
    document.getElementById('restoMaps').value = '';
    toggleModal();
});

function saveAndRender() {
    localStorage.setItem('myRestoMenu', JSON.stringify(allRestos));
    renderList(allRestos);
}

// Menampilkan data dengan gaya "Menu Card"
function renderList(data) {
    wishlistElement.innerHTML = '';
    
    if(data.length === 0) {
        wishlistElement.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: #999; padding: 20px;">Menu wishlist masih kosong. Tekan + untuk menambah.</p>`;
        return;
    }

    data.forEach(resto => {
        const priceClass = resto.price === 'H' ? 'price-h' : 'price-l';
        
        const cardHtml = `
            <div class="menu-card">
                <div class="card-main">
                    <div class="card-header">
                        <span class="cate-tag">${resto.category}</span>
                        <div class="price-circle ${priceClass}">${resto.price}</div>
                    </div>
                    <h2 class="resto-name">${resto.name}</h2>
                </div>
                <div class="card-actions">
                    ${resto.maps ? `<a href="${resto.maps}" target="_blank" class="maps-btn">📍 Lokasi</a>` : '<span></span>'}
                    <button class="delete-ico" onclick="removeResto(${resto.id})">🗑️</button>
                </div>
            </div>
        `;
        wishlistElement.innerHTML += cardHtml;
    });
}

// Fungsi Filter
function filterData(value) {
    // Atur Tombol Aktif
    const buttons = document.querySelectorAll('.filter-scroll button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Logika Filter
    if (value === 'all') {
        renderList(allRestos);
    } else if (value === 'H' || value === 'L') {
        // Filter berdasarkan harga
        const filtered = allRestos.filter(item => item.price === value);
        renderList(filtered);
    } else {
        // Filter berdasarkan kategori
        const filtered = allRestos.filter(item => item.category === value);
        renderList(filtered);
    }
}

// Fungsi Hapus
function removeResto(id) {
    if(confirm("Hapus item menu ini?")) {
        allRestos = allRestos.filter(r => r.id !== id);
        saveAndRender();
    }
}
