// app/search/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
export default function SearchPage() {
  const [cardName, setCardName] = useState('');
  const [cardSet, setCardSet] = useState('');
  const [results, setResults] = useState<Array<string>[]>([]);

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
            <Image 
                  src={card.imageUrl} 
                  alt={card.name} 
                  width={150} // 幅を指定
                  height={200} // 高さを指定
                  priority // 重要な画像としてロードするオプション
                />
          </li>
        ))}
      </ul>
        </div>
      )}
    </div>
  );
}
