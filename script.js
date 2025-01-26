document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const filter = document.querySelector('.filter-options .active')?.dataset.filter || 'all';
    filterAndSearchDishes(searchValue, filter);
});

function filterDishes(filter) {
    const searchValue = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.filter-options button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    filterAndSearchDishes(searchValue, filter);
}

function filterAndSearchDishes(searchValue, filter) {
    const details = document.querySelectorAll('.details');
    
    details.forEach(detail => {
        const items = detail.querySelectorAll('li');
        let matchFound = false;
        
        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const isMatch = itemText.includes(searchValue);
            const isFilterMatch = filter === 'all' || item.dataset.category === filter;
            
            if (isMatch && isFilterMatch) {
                item.style.display = '';
                matchFound = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        if (matchFound) {
            detail.style.display = '';
        } else {
            detail.style.display = 'none';
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}



function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
