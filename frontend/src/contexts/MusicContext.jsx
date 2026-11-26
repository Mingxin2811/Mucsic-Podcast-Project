import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_GENRES, INITIAL_TRACKS, INITIAL_PLAYLISTS } from '../mockData';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [tracks, setTracks] = useState(() => {
    const saved = localStorage.getItem('soundwave_tracks');
    return saved ? JSON.parse(saved) : INITIAL_TRACKS;
  });

  const [genres, setGenres] = useState(() => {
    const saved = localStorage.getItem('soundwave_genres');
    return saved ? JSON.parse(saved) : INITIAL_GENRES;
  });

  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('soundwave_playlists');
    return saved ? JSON.parse(saved) : INITIAL_PLAYLISTS;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('soundwave_favorites');
    return saved ? JSON.parse(saved) : [1, 4, 8, 9];
  });

  useEffect(() => {
    localStorage.setItem('soundwave_tracks', JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    localStorage.setItem('soundwave_playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('soundwave_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (trackId) => {
    setFavorites(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const isFavorite = (trackId) => favorites.includes(trackId);

  const incrementPlayCount = (trackId) => {
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, play_count: t.play_count + 1 } : t));
  };

  const getTrackById = (id) => tracks.find(t => t.id === Number(id));

  const getGenreBySlug = (slug) => genres.find(g => g.slug === slug);

  const createPlaylist = ({ title, description, cover }) => {
    const newPlaylist = {
      id: Date.now(),
      title,
      description: description || 'Danh sách phát cá nhân trên SOUNDWAVE',
      user_id: 4,
      track_ids: [],
      cover_image_path: cover || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      created_at: new Date().toISOString(),
    };
    setPlaylists(prev => [newPlaylist, ...prev]);
    return newPlaylist;
  };

  const addTrackToPlaylist = (playlistId, trackId) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === Number(playlistId)) {
        if (!p.track_ids.includes(Number(trackId))) {
          return { ...p, track_ids: [...p.track_ids, Number(trackId)] };
        }
      }
      return p;
    }));
  };

  const removeTrackFromPlaylist = (playlistId, trackId) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === Number(playlistId)) {
        return { ...p, track_ids: p.track_ids.filter(id => id !== Number(trackId)) };
      }
      return p;
    }));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== Number(playlistId)));
  };

  const creatorUploadTrack = (trackData) => {
    const newTrack = {
      id: Date.now(),
      title: trackData.title,
      artist_name: trackData.artist_name || 'Nghệ sĩ',
      track_type: trackData.track_type || 'music',
      genre_id: Number(trackData.genre_id) || 1,
      genre_name: genres.find(g => g.id === Number(trackData.genre_id))?.name || 'V-Pop',
      genre_slug: genres.find(g => g.id === Number(trackData.genre_id))?.slug || 'v-pop',
      duration: trackData.duration || 215,
      play_count: 0,
      cover_image_path: trackData.cover_image_path || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
      audio_file_path: trackData.audio_file_path || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      creator_id: trackData.creator_id || 2,
      creator_name: trackData.artist_name || 'Creator',
      created_at: new Date().toISOString(),
      deleted_at: null,
      lyrics: trackData.lyrics || null,
      description: trackData.description || null,
    };
    setTracks(prev => [newTrack, ...prev]);
    return newTrack;
  };

  const creatorUpdateTrack = (trackId, updatedData) => {
    setTracks(prev => prev.map(t => {
      if (t.id === Number(trackId)) {
        const genre = genres.find(g => g.id === Number(updatedData.genre_id));
        return {
          ...t,
          ...updatedData,
          genre_name: genre ? genre.name : t.genre_name,
          genre_slug: genre ? genre.slug : t.genre_slug,
        };
      }
      return t;
    }));
  };

  // Soft delete for Creator (UC09)
  const creatorDeleteTrack = (trackId) => {
    setTracks(prev => prev.map(t => t.id === Number(trackId) ? { ...t, deleted_at: new Date().toISOString() } : t));
  };

  // Admin moderation soft delete (UC11)
  const adminToggleTrackViolation = (trackId) => {
    setTracks(prev => prev.map(t => {
      if (t.id === Number(trackId)) {
        return { ...t, deleted_at: t.deleted_at ? null : new Date().toISOString() };
      }
      return t;
    }));
  };

  return (
    <MusicContext.Provider
      value={{
        tracks,
        genres,
        playlists,
        favorites,
        toggleFavorite,
        isFavorite,
        incrementPlayCount,
        getTrackById,
        getGenreBySlug,
        createPlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        deletePlaylist,
        creatorUploadTrack,
        creatorUpdateTrack,
        creatorDeleteTrack,
        adminToggleTrackViolation,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
