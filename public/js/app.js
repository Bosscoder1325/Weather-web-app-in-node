const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = ""
  messageTwo.textContent = ""
  messageOne.textContent = `Loading weather for ${location} ....`;
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Oops 😢 => " + data.error;
        messageTwo.textContent = ""
        search.value = ""
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        search.value = ""
      }
    });
  });
});
