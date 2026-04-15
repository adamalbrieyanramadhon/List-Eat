// Nama storage harus unik agar tidak bentrok dengan versi sebelumnya
const STORAGE_KEY = 'aesthetic_mam_v3';
let allRestos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const wishlistElement = document.getElementById('wishlist');

// Inisialisasi tampilan
renderList(allRestos);

// Fungsi Buka/Tutup Modal
function toggleModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.toggle('show');
}

// Fungsi Tambah Data
document.getElementById('addBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('restoName');
    const categoryInput = document.getElementById('restoCategory');
    const priceInput = document.getElementById('restoPrice');
    const mapsInput = document.getElementById('restoMaps');

    if (!nameInput.value || !categoryInput.value) {
        alert("Nama dan Kategori harus diisi.");
        return;
    }

    const newEntry = {
        id: Date.now(),
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        maps: mapsInput.value
    };

    allRestos.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allRestos));
    
    renderList(allRestos);
    
    // Reset form
    nameInput.value = '';
    mapsInput.value = '';
    categoryInput.value = '';
    
    toggleModal();
});

// Fungsi Render Kartu
function renderList(data) {
    wishlistElement.innerHTML = '';
    
    if(data.length === 0) {
        wishlistElement.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#ccc; padding: 50px; font-style: italic;">List masih kosong...</p>`;
        return;
    }

    data.forEach(item => {
        const card = `
            <div class="card">
                <div class="card-top">
                    <span class="card-cat">${item.category}</span>
                    <span class="card-price-icon">${item.price}</span>
                </div>
                <h2 class="card-title">${item.name}</h2>
                <div class="card-footer">
                    ${item.maps ? `<a href="${item.maps}" target="_blank" class="link-maps">VIEW MAPS</a>` : '<span></span>'}
                    <button class="btn-del" onclick="removeEntry(${item.id})">✕</button>
                </div>
            </div>
        `;
        wishlistElement.insertAdjacentHTML('beforeend', card);
    });
}

// Fungsi Filter
function filterData(val) {
    // Update visual tombol aktif
    const filterBtns = document.querySelectorAll('.btn-filter');
    filterBtns.forEach(btn => {
        if(btn.innerText.toLowerCase() === val.toLowerCase() || (val === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (val === 'all') {
        renderList(allRestos);
    } else if (val === 'H' || val === 'L') {
        renderList(allRestos.filter(i => i.price === val));
    } else {
        renderList(allRestos.filter(i => i.category === val));
    }
}

// Fungsi Hapus
function removeEntry(id) {
    if(confirm("Hapus item ini dari menu?")) {
        allRestos = allRestos.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allRestos));
        renderList(allRestos);
    }
}
