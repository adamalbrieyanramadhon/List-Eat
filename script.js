const STORAGE_KEY = 'culinary_wishlist_v4';
let allRestos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const wishlistElement = document.getElementById('wishlist');

renderList(allRestos);

function toggleModal() {
    document.getElementById('modalOverlay').classList.toggle('show');
}

document.getElementById('addBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('restoName');
    const categoryInput = document.getElementById('restoCategory');
    const mapsInput = document.getElementById('restoMaps');

    if (!nameInput.value || !categoryInput.value) {
        alert("Nama tempat dan kategori wajib diisi ya!");
        return;
    }

    const newResto = {
        id: Date.now(),
        name: nameInput.value,
        category: categoryInput.value,
        maps: mapsInput.value,
        visited: false
    };

    allRestos.push(newResto);
    saveAndRender();
    
    // Reset & Close
    nameInput.value = '';
    mapsInput.value = '';
    categoryInput.value = '';
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
        wishlistElement.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#ccc; padding: 50px;">Belum ada tempat mam yang terdaftar.</p>`;
        return;
    }

    data.forEach(item => {
        const isVisited = item.visited ? 'visited' : '';
        const isChecked = item.visited ? 'checked' : '';

        const card = `
            <div class="card ${isVisited}">
                <div class="card-top">
                    <span class="card-cat">${item.category}</span>
                    <button class="btn-del" onclick="removeResto(${item.id})">✕</button>
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
    // Update active class pada tombol
    document.querySelectorAll('.btn-filter').forEach(btn => {
        if(btn.innerText.toLowerCase().includes(val.toLowerCase()) || (val === 'all' && btn.innerText === 'Semua')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (val === 'all') {
        renderList(allRestos);
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
