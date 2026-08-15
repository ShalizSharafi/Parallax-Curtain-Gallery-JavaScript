////selected elements 
const bubbles = document.querySelectorAll('.bubbles')
const partTwo = document.querySelectorAll('.partTwo')

let scrollTotal = document.documentElement.scrollHeight - innerHeight
console.log(scrollTotal)

//onload
partTwo.forEach((val)=>{
       val.classList.add(val.getAttribute('data-effect'))
})


addEventListener('scroll',()=>{

       ///bubbles
     bubbles.forEach((bubble)=>{
       let speed = bubble.getAttribute('data-speed')
       let offset = scrollY * speed
        offset = Math.max(-100, Math.min(100, offset))
       bubble.style.transform=`translateY(${offset}px)`
     })
     //bubbles


     //partTwo's
     partTwo.forEach((val)=>{
       let partTwoOffset = val.parentElement.offsetTop
       if((scrollY + 300) > partTwoOffset){
               val.classList.remove(val.getAttribute('data-effect'))
       }
     })
})