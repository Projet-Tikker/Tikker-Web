const containerImg = document.getElementById("imgmain");
let imgContainer = document.querySelectorAll(".choice-pp");

imgContainer.forEach(img => {
  img.addEventListener('click', () => containerImg.src = img.src);
})

