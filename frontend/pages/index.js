import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const sendQuery = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Copilot + DB Query</h1>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="자연어 명령 입력" />
      <button onClick={sendQuery}>실행</button>
      {result && (
        <div>
          <p><b>SQL:</b> {result.sql}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
