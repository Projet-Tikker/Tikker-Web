/* -------------- Reavel Animation ----------------*/




let background = ScrollReveal({
    duration: 3000,
    distance: "0px",
  
  });

  let background2 = ScrollReveal({
    duration: 1500,
    distance: "500px",
  
  });

  background.reveal("#back", { origin: "left", delay: 50 });
  background2.reveal("#back-2", { origin: "right", delay: 800 });
//   background.reveal(".tags", { origin: "left", delay: 50 });
//   background2.reveal("#back-4", { origin: "left", delay: 800 });


let title = ScrollReveal({
  duration: 2000,
  distance: "800px",

});

// HEADER


title.reveal(".user", { origin: "right", delay: 1000 });


/* INDEX */


  title.reveal(".t-1", { origin: "top", delay: 1100 });
  title.reveal(".t-2", { origin: "bottom", delay: 1500 });
  title.reveal(".t-3", { origin: "left", delay: 1050 });
  title.reveal(".t-4", { origin: "top", delay: 1850 });
  title.reveal(".t-5", { origin: "right", delay: 2050 });
  title.reveal(".t-6", { origin: "left", delay: 1900 });

  title.reveal(".h2-accueil", { origin: "left", delay: 3000 });



  /*PRESNETATION */

  background.reveal("#back", { origin: "left", delay: 50 });

  /* SEARCH BAR */

  let input = document.querySelector(".input");
  let btn = document.querySelector(".btn");
  let parent = document.querySelector(".search");
  console.log(parent);

  btn.addEventListener("click", () => {
    parent.classList.toggle("active");
    input.focus();
  });