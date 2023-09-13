function changeJoke() {
//   const res = await fetch("https://official-joke-api.appspot.com/random_joke");
//   const joke = await res.json();
//   console.log(joke);

//   document.getElementById("joke-que").innerHTML = joke.setup;
//   document.getElementById("joke-ans").innerHTML = joke.punchline;

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("joke-que").innerHTML = res.setup;
      document.getElementById("joke-ans").innerHTML = res.punchline;
    });
}
