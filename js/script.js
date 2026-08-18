const sections = document.querySelectorAll('.sec')
let currentIndex = 0
let startTime
let startY
let endY
let isAnimating = false
let fromIndex = 0
let toIndex = 0


//set their backgrounds
sections.forEach((sec,i)=>{
  sec.style.backgroundColor=sec.getAttribute('data-bg')
  sec.style.zIndex = i + 1
  if(i === currentIndex){
        sec.style.clipPath = 'inset(0% 0 0 0)'   // fully visible
  }else{
        sec.style.clipPath = 'inset(100% 0 0 0)'   // fully visible
  }
})

addEventListener('wheel',(e)=>{
  //stop the default scroll.
  e.preventDefault()
  console.log('wheel fired, isAnimating:', isAnimating, 'deltaY:', e.deltaY)
  //locking the animation
  if(isAnimating) return 
  console.log(e.deltaY)

  let targetIndex = currentIndex
  if( e.deltaY > 0 ){
    targetIndex = currentIndex + 1
  }else if(e.deltaY < 0) {
    targetIndex = currentIndex - 1
  }
  //updating the current index
  targetIndex = Math.min(Math.max(targetIndex,0),(sections.length -1))
  if(currentIndex === targetIndex) return
  fromIndex = currentIndex   // the section we're leaving 
  toIndex = targetIndex   // sections we're entering
  console.log('fromIndex:', fromIndex, 'toIndex:', toIndex)
  currentIndex = targetIndex
  console.log('currentindex: ',currentIndex)
   startTime = performance.now()
   startY = scrollY
   endY = currentIndex * innerHeight
  console.log('startTime:', startTime, 'startY:', startY, 'endY:', endY)
  isAnimating = true
  animateScroll()


  // scrollTo(0, currentIndex * innerHeight)
//we  have 4 sections, each 100 vh, so the starting position of each sec is 100,200,300,400 e.g)


}, {passive:false})


function animateScroll(){
  let now = performance.now()
  let scrolledPassed = now - startTime //how long has passed since we started 
  let duration = 900
  let progress = scrolledPassed / duration //how man y seconds we're of the way through the animation
  progress = Math.min(progress,1)
    let easedProgress = easeInOutQuad(progress)
  // let newY = startY + (endY - startY )* progress //(progress was how far we're inside the animation)
  // scrollTo(0,newY)

  let fromInset = 100 * easedProgress
  let toInset = 100 - (easedProgress * 100)

  if(toIndex > fromIndex){
    sections[toIndex].style.clipPath=`inset(${toInset}% 0 0 0)`
  }else{
    sections[fromIndex].style.clipPath=`inset(${fromInset}% 0 0 0)`
  }

  if(progress < 1){
    requestAnimationFrame(animateScroll)
  }else{
    setTimeout(() => {
      isAnimating = false
    }, 250);
  }

}

function easeInOutQuad(t) {
  if (t < 0.5) {
    return 4 * t * t * t
  } else {
    return 1 - Math.pow(-2 * t + 2, 3) / 2
  }
}