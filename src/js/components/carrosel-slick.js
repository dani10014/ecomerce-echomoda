export function iniciarCarroselSlick(){

    $(".container-base-card").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots:true,
        arrows:false,
        mobileFirst:true,
        
        responsive:[
            {
                breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
            },
            {
                breakpoint: 992,
                    settings: {
                        slidesToShow: 4
                }
            }
        ]
    })
    $(".menu-vertical__imagens-produto").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:true,
        arrows:false,
    })
    $("#carrosel-sobre-nos").slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        dots:true,
        autoplay:true,
        autoplaySpeed: 1000,
        arrows:false,

            responsive: [
        {
            breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3,
                    dots:true,
                    autoplay:true,
                    autoplaySpeed: 1000,
                    arrows:false,
                }
        },
        {
            breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    dots:true,
                    autoplay:true,
                    autoplaySpeed: 1000,
                    arrows:true,
                }
        }
            ]
    })
}