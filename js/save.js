/* =========================================================
           1. HOVER SLIDER & TEXT STAGGER
           ========================================================= */
        document.addEventListener('DOMContentLoaded', () => {
            // Efeito TextStagger (Geração dinâmica das letras)
            const staggerContainers = document.querySelectorAll('.stagger-text-wrapper');
            
            staggerContainers.forEach(container => {
                const text = container.getAttribute('data-text');
                container.innerHTML = '';
                
                const words = text.split(' ');
                words.forEach((word, wordIndex) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.className = 'stagger-word';
                    
                    [...word].forEach((char, charIndex) => {
                        const box = document.createElement('span');
                        box.className = 'stagger-char-box';

                        const charPrimary = document.createElement('span');
                        charPrimary.className = 'stagger-char';
                        charPrimary.textContent = char;
                        charPrimary.style.transitionDelay = `${(charIndex + wordIndex * 3) * 25}ms`;

                        const charHover = document.createElement('span');
                        charHover.className = 'stagger-char stagger-char-hover';
                        charHover.textContent = char;
                        charHover.style.transitionDelay = `${(charIndex + wordIndex * 3) * 25}ms`;

                        box.appendChild(charPrimary);
                        box.appendChild(charHover);
                        wordSpan.appendChild(box);
                    });

                    container.appendChild(wordSpan);

                    if (wordIndex < words.length - 1) {
                        const space = document.createElement('span');
                        space.innerHTML = '&nbsp;';
                        container.appendChild(space);
                    }
                });
            });

            // Lógica do Slider
            const navItems = document.querySelectorAll('.service-nav-item');
            const images = document.querySelectorAll('.slider-img');
            const caption = document.getElementById('slider-caption');

            function setActiveItem(index) {
                navItems.forEach((item, i) => {
                    const isActive = i === index;
                    item.classList.toggle('active', isActive);
                    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
                });

                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });

                const activeItem = navItems[index];
                if (activeItem && caption) {
                    caption.textContent = activeItem.getAttribute('data-caption');
                }
            }

            navItems.forEach(item => {
                const index = parseInt(item.getAttribute('data-index'), 10);

                item.addEventListener('mouseenter', () => setActiveItem(index));
                item.addEventListener('click', () => setActiveItem(index));

                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveItem(index);
                    }
                });
            });
        });

        /* =========================================================
           2. FILTRO DE SERVIÇOS
           ========================================================= */
        function filterServices(category) {
            const items = document.querySelectorAll('.filter-item');
            const sectionRef = document.getElementById('sec-reformas');
            const sectionCons = document.getElementById('sec-construcao');

            const isReformaCat = ['residencial', 'alto-padrao', 'retrofit', 'estrutural', 'manutencao'].includes(category);
            const isConstrucaoCat = ['construcao', 'projetos'].includes(category);

            items.forEach(item => {
                if (category === 'todos' || item.classList.contains(category)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            if (category === 'todos') {
                sectionRef.style.display = 'block';
                sectionCons.style.display = 'block';
            } else if (isReformaCat) {
                sectionRef.style.display = 'block';
                sectionCons.style.display = 'none';
            } else if (isConstrucaoCat) {
                sectionRef.style.display = 'none';
                sectionCons.style.display = 'block';
            }
        }