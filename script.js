async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>你:</strong> ${message}</p>`;
  input.value = '';

  try {
    const response = await fetch('http://chat.ztrader.ai/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'tinyllama',
        prompt: message,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`响应失败：${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>TinyLlama:</strong> ${data.response}</p>`;
  } catch (err) {
    chatBox.innerHTML += `<p style="color:red;"><strong>TinyLlama: ⚠️</strong> 伺服器錯誤或連線逾時</p>`;
    console.error(err);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
