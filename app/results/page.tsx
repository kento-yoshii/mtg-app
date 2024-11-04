// app/search/results/page.tsx
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const CardResults = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetching data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/cards', {
          params: {
            set: '', // Add actual values based on user input
            name: '', // Add actual values based on user input
            rarity: 'Common', // Example static value
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>カード結果</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <h2>{card.name}</h2>
            <p>{card.text}</p>
            <p>レアリティ: {card.rarity}</p>
            <img src={card.imageUrl} alt={card.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardResults;
