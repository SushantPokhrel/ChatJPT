const api_key = "AIzaSyBCI_aDAA1M7lKHgMXkyHRkHVd0JRIIfyo";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`;
const input = document.querySelector(".typing-input");
const submit_btn = document.querySelector("#send-message-button");
const form = document.querySelector(".typing-form");
const chat_container = document.querySelector(".chat-list");
let user_prompt = null;
let is_loading = null;
let result = null;
form.addEventListener("submit", () => {
  user_prompt = input.value;
  fetchRequest(user_prompt);
  input.value = "";
  if (!is_loading) {
    chat_container.innerHTML = `<p>Generating response...</p>`;
  }
});

//function for prompt
async function fetchRequest(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // for "post" req
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
    result = data.candidates[0].content.parts[0].text;
    if (result) {
      is_loading = false;
      chat_container.innerHTML = `<h3>${prompt}</h3><p>${result}</p>`;
    } else {
      is_loading = true;
    }
  } catch (error) {
    console.log(error);
  }
}
