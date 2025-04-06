async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value;
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>你:</strong> ${message}</p>`;
  input.value = '';

  try {
    const response = await fetch('/api/generate', {
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
  } catch (err) {
    chatBox.innerHTML += `<p><strong>错误:</strong> 无法连接到模型服务，请检查网络或服务器。</p>`;
  }
}
