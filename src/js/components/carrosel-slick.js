export function iniciarCarroselSlick(){

    // Verifica se jQuery/Slick estão disponíveis
    if (typeof window.$ === 'undefined' || typeof window.$.fn === 'undefined' || typeof window.$.fn.slick === 'undefined') {
        console.warn('jQuery ou Slick não está disponível. init do carrossel ignorado.');
        return;
    }

    // Inicializa ou reinicializa .container-base-card
    if (document.querySelector('.container-base-card')){
        const $containers = $('.container-base-card');
        $containers.each(function(){
            const $el = $(this);
            if ($el.hasClass('slick-initialized')){
                $el.slick('unslick');
            }
            $el.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots:true,
                arrows:false,
                mobileFirst:true,
                responsive:[
                    { breakpoint: 768, settings: { slidesToShow: 3 } },
                    { breakpoint: 992, settings: { slidesToShow: 4 } }
                ]
            });
        });
    }

    // menu vertical (inicializa ou reinicializa)
    if (document.querySelector('.menu-vertical__imagens-produto')){
        const $menu = $('.menu-vertical__imagens-produto');
        if ($menu.hasClass('slick-initialized')) $menu.slick('unslick');
        $menu.slick({ slidesToShow:1, slidesToScroll:1, dots:true, arrows:false });
    }

    // carrosel sobre nós (inicializa ou reinicializa)
    if (document.querySelector('#carrosel-sobre-nos')){
        const $sobre = $('#carrosel-sobre-nos');
        if ($sobre.hasClass('slick-initialized')) $sobre.slick('unslick');
        $sobre.slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            dots:true,
            autoplay:true,
            autoplaySpeed: 1000,
            arrows:false,
            responsive: [
                { breakpoint: 768, settings: { arrows: false, centerMode: true, centerPadding: '40px', slidesToShow: 3, dots:true, autoplay:true, autoplaySpeed:1000 } },
                { breakpoint: 480, settings: { arrows: false, centerMode: true, centerPadding: '40px', slidesToShow: 2, dots:true, autoplay:true, autoplaySpeed:1000 } }
            ]
        });
    }
}