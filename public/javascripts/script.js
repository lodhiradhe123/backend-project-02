
const fisrtpage = function(){
    
const tl = gsap.timeline({
    scrollTrigger:{
        trigger:".second",
        scroller:"body",
        // markers:true,
        start:"top 40%",
        end:"top 10%",
        scrub:true,
    }
});
  
tl.to(".firstleft",{
    x:"-30%",
    opacity:0.5,
    duration:1,
   

},"a")
tl.to(".firstright",{
    x:"30%",
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
        translateX:"-220%",
        duration:1
    },"b")
    
    tl1.to(".text",{
        translateX:"-220%",
        duration:1

    },"b")
}

const six = function(){
    
const tl11 = gsap.timeline({
    scrollTrigger:{
        trigger:".six",
        scroller:"body",
        // markers:"true",
        start:"top -60%",
        end: "top -200%",
        scrub:"true"
    }
})

tl11.to(".imgdiv",{
    top:"0%"
})
tl11.to(".imgdiv01",{
    top:"0%"
})
tl11.to(".imgdiv02",{
    top:"0%"
})
}

const nav = function(){
    
document.querySelector(".iconimg").addEventListener("click",()=>{
    gsap.to(".hiddennav",{
        left:"1%",
        duration:0.5,
    })
})
document.querySelector(".hiddennav").addEventListener("mouseleave",()=>{
    gsap.to(".hiddennav",{
        left:"-100%",
        duration:2,
    })
})

   


}




fisrtpage();
animate();
six();
fourth();
nav();
