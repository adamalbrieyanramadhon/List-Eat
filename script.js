let allRestos = JSON.parse(localStorage.getItem('myRestoList')) || [];
const wishlistElement = document.getElementById('wishlist');

renderList(allRestos);

document.getElementById('addBtn').addEventListener('click', function() {
    const name = document.getElementById('restoName').value;
    const category = document.getElementById('restoCategory').value;
    const price = document.getElementById('restoPrice').value;
    const maps = document.getElementById('restoMaps').value;

    if (name === '' || category === '') {
        alert("Nama dan Kategori wajib diisi!");
        return;
    }

    const newResto = { id: Date.now(), name, category, price, maps };
    allRestos.push(newResto);
    saveAndRender();

    document.getElementById('restoName').value = '';
    document.getElementById('restoMaps').value = '';
    document.getElementById('restoCategory').value = '';
});

function saveAndRender() {
    localStorage.setItem('myRestoList', JSON.stringify(allRestos));
    renderList(allRestos);
}

function renderList(data) {
    wishlistElement.innerHTML = '';
    data.forEach(resto => {
        const li = document.createElement('li');
        const priceClass = resto.price === 'H' ? 'price-h' : 'price-l';
        
        // Cek jika kategori adalah Coffee Shop untuk warna tag khusus
        const coffeeClass = resto.category === 'Coffee Shop' ? 'category-tag-coffee' : '';
        
        li.innerHTML = `
            <div class="item-info">
                <div>
                    <span class="category-tag ${coffeeClass}">${resto.category}</span>
                    <span class="price-tag ${priceClass}">${resto.price}</span>
                </div>
                <strong>${resto.name}</strong>
                ${resto.maps ? `<a href="${resto.maps}" target="_blank" class="maps-link">📍 Lihat di Maps</a>` : ''}
            </div>
            <button class="delete-btn" onclick="removeResto(${resto.id})">Hapus</button>
        `;
        wishlistElement.appendChild(li);
    });
}

function filterData(value, type) {
    if (value === 'all') {
        renderList(allRestos);
    } else {
        const filtered = allRestos.filter(item => {
            return type === 'category' ? item.category === value : item.price === value;
        });
        renderList(filtered);
    }
}

function removeResto(id) {
    if(confirm("Hapus dari daftar?")) {
        allRestos = allRestos.filter(r => r.id !== id);
        saveAndRender();
    }
}
