// app/search/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
interface searchCard {
  id: string;
  name: string;
  text: string;
  rarity: string;
  manaCost:string;
  cmc:string;
  imageUrl: string; // 画像のURLを含む場合
}
export default function SearchPage() {
  const [cardName, setCardName] = useState('');
  const [cardSet, setCardSet] = useState('');
  const [results, setResults] = useState<searchCard[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/search?cardName=${encodeURIComponent(cardName)}&cardSet=${encodeURIComponent(cardSet)}`);
      if (!response.ok) throw new Error(`ステータスコード: ${response.status}`);
      
      const data = await response.json();
      console.log("取得したデータ:", data); // デバッグ用
      setResults(data); // ここでresultsにデータをセット
    } catch (error) {
      console.error("エラー:", error);
      if (error instanceof Error) {
        alert(`APIリクエストが失敗しました: ${error.message}`);
      } else {
        alert("不明なエラーが発生しました。");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="カード名"
        />
        <input
          type="text"
          value={cardSet}
          onChange={(e) => setCardSet(e.target.value)}
          placeholder="セット名"
        />
        <button type="submit">検索</button>
      </form>

      <ul>
  {results.map((card, index) => (
    <li key={index}>
      <h2>{card.name}</h2>
      <p>マナコスト: {card.manaCost}</p>
      <p>CMC: {card.cmc}</p>
      <p>カードテキスト：{card.text}</p>
      <Image src={card.imageUrl} alt={card.name} width={200} height={300} />
    </li>
  ))}
</ul>

    </div>
  );
}

