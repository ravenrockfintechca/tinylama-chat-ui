async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>你:</strong> ${message}</p>`;
  input.value = '';

  const isLocal = window.location.hostname === 'localhost';
  const API_URL = isLocal
    ? 'http://localhost:11434/api/generate'
    : 'https://chat.ztrader.ai/api/generate';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'tinyllama:latest',
        prompt: message,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`响应失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>TinyLlama:</strong> ${data.response}</p>`;
  } catch (err) {
    chatBox.innerHTML += `<p style="color:red;"><strong>TinyLlama ⚠️:</strong> 无法连接模型服务，请检查网络或服务器状态。</p>`;
    console.error(err);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
