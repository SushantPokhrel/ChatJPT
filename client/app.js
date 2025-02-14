// const api_key = "";
const API_URL = `https://chatjpt-a097.onrender.com/api/text`;
// please do not misuse this apiKey.
const input = document.querySelector(".typing-input");
const submit_btn = document.querySelector("#send-message-button");
const form = document.querySelector(".typing-form");
const chat_container = document.querySelector(".chat-list");
let user_prompt = null;
let is_loading = null;
let result = null;
const loader = document.createElement("p");
form.addEventListener("submit", () => {
  user_prompt = input.value;
  fetchRequest(user_prompt);
  input.value = "";
  if (!is_loading) {
    loader.textContent = "Generating response...";
    // chat_container.innerHTML = `<p>Generating response...</p>`;
    chat_container.appendChild(loader);
  }
});

//function for prompt
async function fetchRequest(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    const { message } = data;
    // console.log(data.candidates[0].content.parts[0].text);
    result = message;
    if (result) {
      is_loading = false;
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      h3.textContent = `${prompt}`;
      p.textContent = `${result}`;
      loader.textContent = "";
      chat_container.appendChild(h3);
      chat_container.appendChild(p);
      // `<h3>${prompt}</h3><p>${result}</p>`;
    } else {
      is_loading = true;
    }
  } catch (error) {
    console.log(error);
  }
}
const delete_btn = document.querySelector("#delete-chat-button");
delete_btn.addEventListener("click", () => {
  chat_container.textContent = "";
});
