let allRestos = []; // Array untuk menampung semua data

function addResto() {
    const name = document.getElementById('restoName').value;
    const category = document.getElementById('restoCategory').value;
    const maps = document.getElementById('restoMaps').value;

    if (name === '' || category === 'Semua') {
        alert("Nama dan Kategori harus diisi!");
        return;
    }

    const restoData = {
        id: Date.now(),
        name: name,
        category: category,
        maps: maps
    };

    allRestos.push(restoData);
    renderList(allRestos);
    
    // Reset input
    document.getElementById('restoName').value = '';
    document.getElementById('restoMaps').value = '';
}

function renderList(data) {
    const listElement = document.getElementById('wishlist');
    listElement.innerHTML = '';

    data.forEach(resto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-info">
                <span class="category-tag">${resto.category}</span>
                <strong>${resto.name}</strong>
                ${resto.maps ? `<a href="${resto.maps}" target="_blank" class="maps-link">📍 Lihat di Maps</a>` : ''}
            </div>
            <button class="delete-btn" onclick="removeResto(${resto.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}

function filterResto(category) {
    if (category === 'Semua') {
        renderList(allRestos);
    } else {
        const filtered = allRestos.filter(r => r.category === category);
        renderList(filtered);
    }
}

function removeResto(id) {
    allRestos = allRestos.filter(r => r.id !== id);
    renderList(allRestos);
}
