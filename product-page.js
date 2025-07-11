document.addEventListener('DOMContentLoaded', function() {
    // Product page functionality
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const variantBtns = document.querySelectorAll('.variant-btn');
    
    // Thumbnail click functionality
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;
        });
    });
    
    // Variant button functionality
    variantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all variant buttons
            variantBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update product title with variant
            const variant = btn.getAttribute('data-variant');
            const color = btn.getAttribute('data-color');
            const productTitle = document.querySelector('.product-title');
            const baseTitle = productTitle.textContent.split(' - ')[0];
            productTitle.textContent = `${baseTitle} - ${color}`;
            
            // Update main image based on variant
            // For now, we'll use the same image but in a real implementation,
            // you would have different images for each variant
            const variantThumbnail = document.querySelector(`[data-variant="${variant}"]`);
            if (variantThumbnail) {
                thumbnails.forEach(t => t.classList.remove('active'));
                variantThumbnail.classList.add('active');
                mainImage.src = variantThumbnail.src;
                mainImage.alt = `${baseTitle} - ${color}`;
            }
        });
    });
    
    // Make logo clickable
    const logo = document.querySelector('.logo a');
    if (logo) {
        logo.style.textDecoration = 'none';
        logo.style.color = 'inherit';
    }
}); 