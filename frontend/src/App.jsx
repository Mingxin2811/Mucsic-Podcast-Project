import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { MusicProvider } from './contexts/MusicContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CuratedPanel } from './components/layout/CuratedPanel';
import { PersistentPlayer } from './components/player/PersistentPlayer';

import { Toast } from './components/common/Toast';
import { AddToPlaylistModal } from './components/common/AddToPlaylistModal';
import { LyricsModal } from './components/common/LyricsModal';

// Pages
import { SCR01_Home } from './pages/SCR01_Home';
import { SCR02_Search } from './pages/SCR02_Search';
import { SCR03_GenreDetail } from './pages/SCR03_GenreDetail';
import { SCR04_TrackDetail } from './pages/SCR04_TrackDetail';
import { SCR05_Playlists } from './pages/SCR05_Playlists';
import { SCR08_CreatorUpload } from './pages/SCR08_CreatorUpload';
import { SCR09_CreatorStudio } from './pages/SCR09_CreatorStudio';
import { SCR10_AdminPortal } from './pages/SCR10_AdminPortal';
import { SCR12_UserProfile } from './pages/SCR12_UserProfile';

// Global modals (không có route riêng — overlay toàn cục)
import { SCR06_RegisterModal } from './pages/SCR06_RegisterModal';
import { SCR07_LoginModal } from './pages/SCR07_LoginModal';
import { SCR11_ForgotPasswordModal } from './pages/SCR11_ForgotPasswordModal';

// Router
import { ROUTES, ROUTE_META } from './router/routes';
import { ProtectedRoute } from './router/ProtectedRoute';

// ─── Wrapper components giúp truyền URL params xuống page ────────────────────

const GenreDetailPage = () => {
  const { slug } = useParams();
  return <SCR03_GenreDetail genreSlug={slug} />;
};

const TrackDetailPage = () => {
  const { id } = useParams();
  return <SCR04_TrackDetail trackId={Number(id)} />;
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  return <SCR02_Search searchQuery={query} />;
};

// ─── Layout chính bao quanh tất cả các Route ─────────────────────────────────

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0c0e12] text-gray-200">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Work Area (Header + Scrollable Screen Content) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <Header />

        {/* Dynamic Page View — React Router renders vào đây */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 pt-6 pb-28">
          <Routes>
            {/* ── Public Routes ─────────────────────────── */}
            <Route path={ROUTES.HOME} element={<SCR01_Home />} />
            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.GENRE_DETAIL} element={<GenreDetailPage />} />
            <Route path={ROUTES.TRACK_DETAIL} element={<TrackDetailPage />} />

            {/* ── Auth-Required Routes ──────────────────── */}
            <Route
              path={ROUTES.PLAYLISTS}
              element={
                <ProtectedRoute
                  requiresAuth={ROUTE_META[ROUTES.PLAYLISTS].requiresAuth}
                  allowedRoles={ROUTE_META[ROUTES.PLAYLISTS].allowedRoles}
                >
                  <SCR05_Playlists />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute
                  requiresAuth={ROUTE_META[ROUTES.PROFILE].requiresAuth}
                  allowedRoles={ROUTE_META[ROUTES.PROFILE].allowedRoles}
                >
                  <SCR12_UserProfile />
                </ProtectedRoute>
              }
            />

            {/* ── Creator Routes ────────────────────────── */}
            <Route
              path={ROUTES.CREATOR_UPLOAD}
              element={
                <ProtectedRoute
                  requiresAuth={ROUTE_META[ROUTES.CREATOR_UPLOAD].requiresAuth}
                  allowedRoles={ROUTE_META[ROUTES.CREATOR_UPLOAD].allowedRoles}
                >
                  <SCR08_CreatorUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CREATOR_STUDIO}
              element={
                <ProtectedRoute
                  requiresAuth={ROUTE_META[ROUTES.CREATOR_STUDIO].requiresAuth}
                  allowedRoles={ROUTE_META[ROUTES.CREATOR_STUDIO].allowedRoles}
                >
                  <SCR09_CreatorStudio />
                </ProtectedRoute>
              }
            />

            {/* ── Admin Route ───────────────────────────── */}
            <Route
              path={ROUTES.ADMIN}
              element={
                <ProtectedRoute
                  requiresAuth={ROUTE_META[ROUTES.ADMIN].requiresAuth}
                  allowedRoles={ROUTE_META[ROUTES.ADMIN].allowedRoles}
                >
                  <SCR10_AdminPortal />
                </ProtectedRoute>
              }
            />

            {/* ── Fallback: redirect về Home ────────────── */}
            <Route path="*" element={<SCR01_Home />} />
          </Routes>
        </main>
      </div>

      {/* 3. Right Curated Showcase Panel */}
      <CuratedPanel />

      {/* 4. Persistent Bottom Audio Player */}
      <PersistentPlayer />

      {/* 5. Global Modals & Overlays (không có route riêng) */}
      <SCR06_RegisterModal />
      <SCR07_LoginModal />
      <SCR11_ForgotPasswordModal />
      <AddToPlaylistModal />
      <LyricsModal />
      <Toast />
    </div>
  );
};

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MusicProvider>
          <AudioPlayerProvider>
            <MainLayout />
          </AudioPlayerProvider>
        </MusicProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
