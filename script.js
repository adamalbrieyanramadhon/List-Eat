const STORAGE_KEY = 'culinary_wishlist_v5';
let allRestos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const wishlistElement = document.getElementById('wishlist');

// Mapping Tema Kategori
const themeMap = {
    'Sushi': 'theme-sushi',
    'Thailand': 'theme-thailand',
    'Street Food': 'theme-street',
    'Daging/Meat': 'theme-meat',
    'Coffee Shop': 'theme-coffee'
};

renderList(allRestos);

function toggleModal() {
    document.getElementById('modalOverlay').classList.toggle('show');
}

document.getElementById('addBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('restoName');
    const categoryInput = document.getElementById('restoCategory');
    const priceInput = document.getElementById('restoPrice');
    const mapsInput = document.getElementById('restoMaps');

    if (!nameInput.value || !categoryInput.value) {
        alert("Nama tempat dan kategori wajib diisi ya!");
        return;
    }

    const newResto = {
        id: Date.now(),
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value || 'L', 
        maps: mapsInput.value,
        visited: false
    };

    allRestos.push(newResto);
    saveAndRender();
    
    // Reset form
    nameInput.value = '';
    mapsInput.value = '';
    categoryInput.value = '';
    priceInput.value = 'L';
    toggleModal();
});

function saveAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allRestos));
    renderList(allRestos);
}

function toggleVisited(id) {
    const index = allRestos.findIndex(r => r.id === id);
    if (index !== -1) {
        allRestos[index].visited = !allRestos[index].visited;
        saveAndRender();
    }
}

function renderList(data) {
    wishlistElement.innerHTML = '';
    
    if(data.length === 0) {
        wishlistElement.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#ccc; padding: 50px;">Belum ada tempat mam di list ini.</p>`;
        return;
    }

    data.forEach(item => {
        const isVisited = item.visited ? 'visited' : '';
        const isChecked = item.visited ? 'checked' : '';
        const itemPrice = item.price || 'L'; 
        const priceClass = itemPrice === 'H' ? 'price-h' : 'price-l';
        const themeClass = themeMap[item.category] || 'theme-default';

        const card = `
            <div class="card ${isVisited} ${themeClass}">
                <div class="card-top">
                    <span class="card-cat">${item.category}</span>
                    <div class="top-right">
                        <span class="price-badge ${priceClass}">${itemPrice}</span>
                        <button class="btn-del" onclick="removeResto(${item.id})">✕</button>
                    </div>
                </div>
                <h2 class="card-title">${item.name}</h2>
                <div class="card-footer">
                    <label class="check-btn">
                        <input type="checkbox" ${isChecked} onclick="toggleVisited(${item.id})">
                        ${item.visited ? 'Sudah Pernah ✨' : 'Belum Dicoba'}
                    </label>
                    ${item.maps ? `<a href="${item.maps}" target="_blank" class="link-maps">📍 Lokasi</a>` : '<span></span>'}
                </div>
            </div>
        `;
        wishlistElement.insertAdjacentHTML('beforeend', card);
    });
}

function filterData(val) {
    // 1. Tombol Filter Kategori
    document.querySelectorAll('.btn-filter').forEach(btn => {
        if (val !== 'H' && val !== 'L' && btn.getAttribute('onclick').includes(`'${val}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Tombol Filter Harga
    document.querySelectorAll('.btn-price').forEach(btn => {
        if ((val === 'H' || val === 'L') && btn.innerText === val) {
            btn.style.backgroundColor = '#2d3436';
            btn.style.color = 'white';
            btn.style.borderColor = '#2d3436';
        } else {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#666';
            btn.style.borderColor = '#ddd';
        }
    });

    // 3. Logika Filter Tampilan
    if (val === 'all') {
        renderList(allRestos);
    } else if (val === 'H' || val === 'L') {
        renderList(allRestos.filter(i => (i.price || 'L') === val));
    } else {
        renderList(allRestos.filter(i => i.category === val));
    }
}

function removeResto(id) {
    if(confirm("Hapus dari wishlist?")) {
        allRestos = allRestos.filter(i => i.id !== id);
        saveAndRender();
    }
}
