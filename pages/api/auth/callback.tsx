import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code non presente nella richiesta' });
  }

  const client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const client_secret = process.env.STRAVA_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;
  const refresh_token = process.env.STRAVA_REFRESH_TOKEN;
    
  // Scambio del codice per un token di accesso
  try {
    const body = JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    });

    const response = await fetch(`https://www.strava.com/oauth/token`, {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();

    if (response.ok) {
      // Reindirizza l'utente o gestisci il token come desideri
      res.redirect('/dashboard');
      //return res.status(200).json({ message: 'Autenticazione riuscita', data });
    } else {
      return res.status(400).json({ error: 'Autenticazione fallita', data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Errore durante l\'autenticazione', details: error });
  }
}
