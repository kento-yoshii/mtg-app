// app/search/page.tsx
"use client";

import { useState } from 'react';

export default function SearchPage() {
  const [cardName, setCardName] = useState('');
  const [cardSet, setCardSet] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/search?cardName=${encodeURIComponent(cardName)}&cardSet=${encodeURIComponent(cardSet)}`);
      if (!response.ok) throw new Error(`ステータスコード: ${response.status}`);
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("エラー:", error);
      alert(`APIリクエストが失敗しました: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardName">カード名</label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <label htmlFor="cardSet">セット名：</label>
        <input
          type="text"
          id="cardSet"
          value={cardSet}
          onChange={(e) => setCardSet(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      {results.length > 0 && (
        <div>
          <h2>検索結果</h2>
          <ul>
        {results.map((card) => (
          <li key={card.id}>
            <h2>{card.name}</h2>
            <p>{card.text}</p>
            <p>レアリティ: {card.rarity}</p>
            <img src={card.imageUrl} alt={card.name} />
          </li>
        ))}
      </ul>
        </div>
      )}
    </div>
  );
}
