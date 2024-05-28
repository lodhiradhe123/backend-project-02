
const fisrtpage = function(){
    
const tl = gsap.timeline({
    scrollTrigger:{
        trigger:".second",
        scroller:"body",
        // markers:true,
        start:"top 50%",
        end:"top 10%",
        scrub:true,
    }
});
  
tl.to(".firstleft",{
    x:"-100%",
    opacity:0.5,
    duration:1,
   

},"a")
tl.to(".firstright",{
    x:"100%",
    opacity:0,
    duration:1,
   

},"a")
}

const animate =function(){

    
document.querySelectorAll(".content01").forEach(function(ele){
    ele.addEventListener("mouseenter",function(){
            gsap.to(this.querySelectorAll(".element ,.elebtn"),{
                scale:1,
                opacity:1,
                color:"black",
                font:"bold"
            
            })
            
             gsap.to(this.querySelector(".contentimg"),{
                scale:3,
                opacity:.5,
                duration:1,
            
             })
             gsap.to(this.querySelector(".slide"),{
               x:"-100%",
            
             })
             gsap.to(this.querySelector(".topcontent"),{
                scale:1.05,
             })
        
            
            
        })
        
        ele.addEventListener("mouseleave",function(){
            gsap.to(this.querySelectorAll(".element,.elebtn"),{
                opacity:0,
            
            })
            gsap.to(this.querySelector(".elebtn"),{
                opacity:0,
            
            })
             gsap.to(this.querySelector(".contentimg"),{
                scale:1,
                opacity:1
            
             })
             gsap.to(this.querySelector(".slide"),{
               x:"100%",
               opacity:1
               
            
             })
             gsap.to(this.querySelector(".topcontent"),{scale:.8, })
        
            
            
        })



    })


}

const fourth = function(){
    const tl1 = gsap.timeline({
        scrollTrigger:{
            trigger:".fourth",
            scroller:"body",
            // markers:true,
            start:" top 50%",
            start:" top -10%",
            scrub:true,
            pin:true,
        }
    })
    tl1.to(".length",{
        translateX:"-220%"
    },"b")
    
    tl1.to(".text",{
        translateX:"-220%"
    
    
    },"b")
}





fisrtpage();
animate();
fourth();
