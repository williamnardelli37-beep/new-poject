// --- CARROSSEL INFINITO (Auto-scroll para a Galeria/Promo) ---
// Note que adicionei suporte para os dois IDs caso você mude no HTML
const galeriaElement = document.getElementById('galeria') || document.getElementById('lista-promo');

function iniciarCarrosselInfinito() {
    if (!galeriaElement) return;

    // Duplica o conteúdo para criar o efeito infinito visual
    galeriaElement.innerHTML += galeriaElement.innerHTML;

    let scrollPos = 0;
    const speed = 1.0; 

    function render() {
        scrollPos += speed;

        if (scrollPos >= galeriaElement.scrollWidth / 2) {
            scrollPos = 0;
        }

        galeriaElement.scrollLeft = scrollPos;
        requestAnimationFrame(render);
    }

    render();
}

// --- FILTRO DE SERVIÇOS (Corrigido para ocultar títulos vazios) ---
function filterServices(category) {
    const items = document.querySelectorAll('.filter-item');
    const sectionRef = document.getElementById('sec-reformas');
    const sectionCons = document.getElementById('sec-construcao');

    // 1. Primeiro, mostra ou esconde cada item individualmente
    items.forEach(item => {
        if (category === 'todos' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // 2. Agora, verifica se as seções ficaram vazias e as esconde se necessário
    if (sectionRef) {
        // Verifica se existe algum item VISÍVEL dentro desta seção
        const temReformaVisivel = Array.from(sectionRef.querySelectorAll('.filter-item'))
                                      .some(item => item.style.display === 'flex');
        
        // Se não tiver nada visível, esconde a seção inteira (título + lista)
        sectionRef.style.display = temReformaVisivel ? 'block' : 'none';
    }

    if (sectionCons) {
        // Faz a mesma verificação para a seção de construção
        const temConstrucaoVisivel = Array.from(sectionCons.querySelectorAll('.filter-item'))
                                         .some(item => item.style.display === 'flex');
        
        sectionCons.style.display = temConstrucaoVisivel ? 'block' : 'none';
    }
}

// --- INICIALIZAÇÃO ---
window.addEventListener('load', () => {
    iniciarCarrosselInfinito();
});

// --- CARROSSEL HERO (Opcional) ---
// Mantido caso você adicione a estrutura .hero-track no futuro
const track = document.querySelector('.hero-track');
const slides = document.querySelectorAll('.slide');
let indexAtual = 0;

function moverCarrossel() {
    if (!track || slides.length === 0) return;
    indexAtual++;
    if (indexAtual >= slides.length) indexAtual = 0;
    track.style.transform = `translateX(-${indexAtual * 100}vw)`;
}

if (track) {
    setInterval(moverCarrossel, 4000);
}