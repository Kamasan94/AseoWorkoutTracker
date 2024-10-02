import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch'; // Assicurati di avere `node-fetch` installato per le richieste API
import { json } from 'stream/consumers';

const prisma = new PrismaClient();

interface StravaActivity {
    id: number;                         // ID dell'attività
    name: string;                       // Nome dell'attività
    elapsed_time: number;               // Durata in minuti
    distance: number;                   // Distanza in metri
    total_elevation_gain: number;       // Dislivello positivo complessivo
    sport_type: string;                 // Tipo di sport (es. 'Run', 'Ride')
    start_date: string;                 // Data di inizio (formato ISO 8601)
    start_date_local: string;           // Data di inizio locale
    timezone: string;                   // Fuso orario
    description: string;                // Descrizione dell'attività
    calories: number;                   // Calorie bruciate
    utc_offset?: number;                // Offset UTC (opzionale)
    start_latlng?: [number, number];    // Latitudine e longitudine di partenza (opzionale)
    end_latlng?: [number, number];      // Latitudine e longitudine di arrivo (opzionale)
    achievement_count?: number;         // Numero di achievement
    kudos_count?: number;               // Numero di kudos ricevuti
    comment_count?: number;             // Numero di commenti
    athlete_count?: number;             // Numero di atleti coinvolti
    photo_count?: number;               // Numero di foto associate all'attività
    map?: {                             // Mappa dell'attività (opzionale)
      id: string;
      summary_polyline: string;
      resource_state: number;
    };
    average_speed?: number;             // Velocità media (m/s)
    max_speed?: number;                 // Velocità massima (m/s)
    average_cadence?: number;           // Cadenza media
    average_temp?: number;              // Temperatura media (°C)
    average_watts?: number;             // Potenza media (Watt)
    weighted_average_watts?: number;    // Potenza media ponderata (Watt)
    kilojoules?: number;                // Energia spesa (kJ)
    max_watts?: number;                 // Potenza massima (Watt)
    elev_high?: number;                 // Altitudine massima raggiunta (metri)
    elev_low?: number;                  // Altitudine minima raggiunta (metri)
    workout_type?: string;              // Tipo di workout (opzionale)
    suffer_score?: number;              // Punteggio di fatica (opzionale)
    typeId: number;                     // ID del tipo di attività
  }


/**
 * Inserisce un workout nel database partendo da un'attività di Strava.
 * @param {number} activityId - L'ID dell'attività recuperata da Strava.
 * @param {string} accessToken - L'access token dell'utente per autenticare le richieste API Strava.
 * @returns {Promise<void>} - Restituisce una promise che indica il successo o il fallimento dell'inserimento.
 */
async function insertWorkoutFromStrava(activityId: number, accessToken: string): Promise<void> {
  try {
    // Chiamata API per ottenere i dettagli dell'attività da Strava
    const response = await fetch(`https://www.strava.com/api/v3/activities/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nel recupero dell'attività da Strava: ${response.statusText}`);
    }

    const activity = (await response.json()) as StravaActivity;

    // Estrarre i dettagli dell'attività rilevanti per il database
    const workoutData = {
        id: activity.id,
        name: activity.name,
        elapsed_time: activity.elapsed_time,
        distance: activity.distance,
        total_elevation_gain: activity.total_elevation_gain,
        sport_type: activity.sport_type,
        start_date: new Date(activity.start_date),
        start_date_local: new Date(activity.start_date_local),
        timezone: activity.timezone,
        description: activity.description || '',
        calories: activity.calories,
        utc_offset: activity.utc_offset || null,
        start_latlng: activity.start_latlng,
        end_latlng: activity.end_latlng,
        achievement_count: activity.achievement_count || null,
        kudos_count: activity.kudos_count || null,
        comment_count: activity.comment_count || null,
        athlete_count: activity.athlete_count || null,
        photo_count: activity.photo_count || null,
        map: activity.map ? JSON.parse(JSON.stringify(activity.map)) : null,
        average_speed: activity.average_speed || null,
        max_speed: activity.max_speed || null,
        average_cadence: activity.average_cadence || null,
        average_temp: activity.average_temp || null,
        average_watts: activity.average_watts || null,
        weighted_average_watts: activity.weighted_average_watts || null,
        kilojoules: activity.kilojoules || null,
        max_watts: activity.max_watts || null,
        elev_high: activity.elev_high || null,
        elev_low: activity.elev_low || null,
        workout_type: activity.workout_type || null,
        suffer_score: activity.suffer_score || null,
        typeId: 1, // Assicurati di mappare correttamente il typeId, potrebbe essere basato su activity.type o altro
      };

    // Inserimento nel database utilizzando Prisma
    await prisma.workout.create({
      data: workoutData
    });


    console.log('Workout inserito con successo nel database');
  } catch (error) {
    console.error('Errore durante l’inserimento del workout:', error);
  }
}
