import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { supabase } from '../lib/supabase.js';
import { useAuth } from '../context/AuthContext.jsx';

import { getBeer } from '../services/api.js';

export default function BeerDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const numericBeerId = Number(id);
  const beerId = Number.isNaN(numericBeerId) ? id : numericBeerId;

  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isFavorited, setIsFavorited] = useState(false);
  const [isTried, setIsTried] = useState(false);

  const [rating, setRating] = useState('5');
  const [message, setMessage] = useState('');
  const [favoriteId, setFavoriteId] = useState(null);
  const [triedId, setTriedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getBeer(id)
      .then((data) => {
        if (cancelled) return;
        setBeer(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || 'Failed to load beer');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    async function loadUserState() {
      setMessage('');
      setFavoriteId(null);
      setTriedId(null);
      setIsFavorited(false);
      setIsTried(false);

      const { data: fav, error: favError } = await supabase
        .from('favorites')
        .select('favorite_id')
        .eq('user_id', user.id)
        .eq('beer_id', beerId)
        .maybeSingle();

      if (cancelled) return;
      if (favError) {
        setMessage(favError.message || 'Failed to load favorite');
      } else {
        setFavoriteId(fav?.favorite_id ?? null);
        setIsFavorited(Boolean(fav));
      }

      const { data: tried, error: triedError } = await supabase
        .from('tried_beers')
        .select('tried_id')
        .eq('user_id', user.id)
        .eq('beer_id', beerId)
        .maybeSingle();

      if (cancelled) return;
      if (triedError) {
        setMessage(triedError.message || 'Failed to load tried status');
      } else {
        setTriedId(tried?.tried_id ?? null);
        setIsTried(Boolean(tried));
      }

      const { data: existingRating, error: ratingError } = await supabase
        .from('ratings')
        .select('score')
        .eq('user_id', user.id)
        .eq('beer_id', beerId)
        .maybeSingle();

      if (cancelled) return;
      if (ratingError) {
        setMessage(ratingError.message || 'Failed to load rating');
      } else if (existingRating?.score != null) {
        setRating(String(existingRating.score));
      }
    }

    if (user?.id && id) {
      loadUserState();
    }

    return () => {
      cancelled = true;
    };
  }, [user?.id, id, beerId]);

  async function onRate() {
    setMessage('');
    try {
      const { error: upsertError } = await supabase
        .from('ratings')
        .upsert(
          {
            user_id: user.id,
            beer_id: beerId,
            score: Number(rating)
          },
          { onConflict: 'user_id,beer_id' }
        );
      if (upsertError) throw upsertError;
      setMessage('Rating saved. Check Recommendations.');
    } catch (e) {
      setMessage(e.message || 'Failed to rate');
    }
  }

  async function onToggleFavorite() {
    setMessage('');
    try {
      if (isFavorited) {
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('beer_id', beerId);
        if (deleteError) throw deleteError;
        setIsFavorited(false);
        setFavoriteId(null);
      } else {
        const { data, error: insertError } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, beer_id: beerId })
          .select('favorite_id')
          .single();
        if (insertError) throw insertError;
        setIsFavorited(true);
        setFavoriteId(data?.favorite_id ?? null);
      }
    } catch (e) {
      setMessage(e.message || 'Failed to update favorite');
    }
  }

  async function onToggleTried() {
    setMessage('');
    try {
      if (isTried) {
        const { error: deleteError } = await supabase
          .from('tried_beers')
          .delete()
          .eq('user_id', user.id)
          .eq('beer_id', beerId);
        if (deleteError) throw deleteError;
        setIsTried(false);
        setTriedId(null);
      } else {
        const { data, error: insertError } = await supabase
          .from('tried_beers')
          .insert({ user_id: user.id, beer_id: beerId, tried_at: new Date().toISOString() })
          .select('tried_id')
          .single();
        if (insertError) throw insertError;
        setIsTried(true);
        setTriedId(data?.tried_id ?? null);
      }
    } catch (e) {
      setMessage(e.message || 'Failed to update tried');
    }
  }

  return (
    <div className="stack">
      <div className="card">
        <Link to="/" className="small">← Back</Link>
      </div>

      <div className="card stack">
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {beer && (
          <>
            <div><strong>{beer.beer_name}</strong></div>
            <div className="small">{beer.style} • {beer.abv}% ABV</div>

            <div className="row">
              <button onClick={onToggleFavorite} style={{ flex: 1 }}>
                {isFavorited ? '♥ Favorited' : '♥ Favorite'}
              </button>
              <button onClick={onToggleTried} style={{ flex: 1 }}>
                {isTried ? '✓ Tried' : '✓ Mark as Tried'}
              </button>
            </div>

            <div className="row">
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ flex: 1 }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button onClick={onRate} style={{ flex: 1 }}>Rate</button>
            </div>
            {message && <div className="small">{message}</div>}
          </>
        )}
      </div>
    </div>
  );
}
