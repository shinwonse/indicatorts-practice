import { macdStrategy } from 'indicatorts';

async function getCandles(market: string) {
  const serverUrl = process.env.UPBIT_OPEN_API_SERVER_URL;
  const options = {
    headers: { accept: 'application/json' },
    method: 'GET',
    url: `${serverUrl}/v1/candles/days?market=${market}&count=3`,
  };

  const res = await fetch(options.url, {
    headers: options.headers,
    method: options.method,
  });

  return res.json();
}

export default function MACDPage() {
  macdStrategy({});
  return (
    <div>
      <h1>MACD</h1>
    </div>
  );
}
