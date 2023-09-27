import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

async function getData() {
  const accessKey = process.env.UPBIT_OPEN_API_ACCESS_KEY;
  const secretKey = process.env.UPBIT_OPEN_API_SECRET_KEY;
  const serverUrl = process.env.UPBIT_OPEN_API_SERVER_URL;

  const payload = {
    access_key: accessKey,
    nonce: uuidv4(),
  };

  const token = jwt.sign(payload, secretKey as string);

  const options = {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
    url: `${serverUrl}/v1/accounts`,
  };

  const res = await fetch(options.url, {
    headers: options.headers,
    method: options.method,
  });

  return res.json();
}

async function getMarketCode() {
  const serverUrl = process.env.UPBIT_OPEN_API_SERVER_URL;
  const options = {
    headers: { accept: 'application/json' },
    method: 'GET',
    url: `${serverUrl}/v1/market/all?isDetails=false`,
  };

  const res = await fetch(options.url, {
    headers: options.headers,
    method: options.method,
  });

  return res.json();
}

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

export default async function Home() {
  const data = await getData();
  const marketCodeArray = await getMarketCode();
  const bitcoinMarketCode = marketCodeArray.find((item: any) => {
    return item.market.includes('KRW-BTC');
  });
  const candles = await getCandles(bitcoinMarketCode.market);
  console.log(candles);
  return (
    <main>
      {data.map((item: any) => {
        return (
          <div key={item.currency}>
            <h1>{item.currency}</h1>
            <p>{item.balance}</p>
            <p>{item.locked}</p>
            <p>{item.avg_buy_price}</p>
            <p>{item.avg_buy_price_modified}</p>
            <p>{item.unit_currency}</p>
          </div>
        );
      })}
    </main>
  );
}
