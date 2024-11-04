// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Magic from 'mtgsdk-ts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardName = searchParams.get('cardName');
  const cardSet = searchParams.get('cardSet');

  try {
    const cards = await Magic.Cards.where({
      name: cardName || undefined,  // null の場合は undefined に
      language: 'Japanese',
      set: cardSet || undefined,     // null の場合は undefined に
    });
    return NextResponse.json(cards);
  } catch (error) {
    console.error("APIリクエストのエラー:", error);
    return NextResponse.json({ error: 'APIリクエストが失敗しました' }, { status: 500 });
  }
}
