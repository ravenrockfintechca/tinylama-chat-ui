async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value;
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>你:</strong> ${message}</p>`;
  input.value = '';

  const response = await fetch('http://45.76.196.88:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "tinyllama",
      prompt: message,
      stream: false
    })
  });

  const data = await response.json();
  chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}