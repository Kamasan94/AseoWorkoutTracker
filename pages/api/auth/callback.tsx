import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code non presente nella richiesta' });
  }

  const client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const client_secret = process.env.STRAVA_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;

  // Scambio del codice per un token di accesso
  try {
    const response = await fetch(`https://www.strava.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Reindirizza l'utente o gestisci il token come desideri
      return res.status(200).json({ message: 'Autenticazione riuscita', data });
    } else {
      return res.status(400).json({ error: 'Autenticazione fallita', data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Errore durante l\'autenticazione', details: error });
  }
}
