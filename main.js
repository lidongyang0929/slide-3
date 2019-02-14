let $buttons =$('#buttonWrapper>button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')
makeFakeSlides()

$slides.css({transform: 'translateX(-400px)'})

bindEvents()

$('#next').on('click',function(){
    goToSlide(current+1)
})
$('#previous').on('click',function(){
    goToSlide(current-1)
})

let timer =setInterval(function(){
    goToSlide(current+1)
},2000)
$('#container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer =setInterval(function(){
        goToSlide(current+1)
    },2000)
})






function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}
function goToSlide(index){
    if(index > $images.length-1){index=0}
    else if(index < 0){index=$images.length-1}
    if(current === $images.length-1 && index === 0){
        $slides.css({transform:`translateX(${-($images.length+1)*400}px)`})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:'translateX(-400px)'}).show()
        })
    }else if(current === 0 && index === $images.length-1){
        $slides.css({transform:'translateX(0px)'})
            .one('transitionend',function(){
                $slides.hide().offset()
                $slides.css({transform:`translateX(${-($images.length)*400}px)`}).show()
            })
    }else{
    $slides.css({transform: `translateX(${-(index + 1)*400}px`})}
    current = index
}

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
