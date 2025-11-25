"use client";

import { useState } from "react";
import { X, Plus, Search } from "lucide-react";

// --- Types ---
interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  duration: number; // in minutes
  releaseDate: string; // YYYY-MM-DD
  genre: string; // e.g. "Action, Sci-Fi"
  language: string; // e.g. "English, Hindi"
  certificate: "U" | "U/A" | "A" | "S"; 
  cast: string; // e.g. "Matthew McConaughey, Anne Hathaway"
  status: "Now Showing" | "Upcoming";
}

// --- 1. THE EDIT/ADD MODAL COMPONENT ---
function MovieFormModal({
  movie,
  isOpen,
  onClose,
  onSave,
}: {
  movie: Movie | null; // If null, we are in "Add Mode"
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Movie) => void;
}) {
  if (!isOpen) return null;

  // Default state for "Add New"
  const initialState: Movie = movie || {
    id: "",
    title: "",
    description: "",
    posterUrl: "",
    trailerUrl: "",
    duration: 0,
    releaseDate: "",
    genre: "",
    language: "",
    certificate: "U/A",
    cast: "",
    status: "Upcoming",
  };

  const [formData, setFormData] = useState<Movie>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {movie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          
          {/* Title (Full Width) */}
          <div className="md:col-span-2">
            <label className="label">Movie Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Interstellar"
            />
          </div>

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Plot summary..."
            />
          </div>

          {/* Poster URL */}
          <div className="md:col-span-2">
            <label className="label">Poster Image URL</label>
            <input
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              className="input-field"
              placeholder="https://image.tmdb.org/..."
            />
          </div>

          {/* Trailer URL */}
          <div className="md:col-span-2">
            <label className="label">Trailer Link (YouTube)</label>
            <input
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              className="input-field"
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Duration */}
          <div>
            <label className="label">Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. 169"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="label">Release Date</label>
            <input
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Certificate */}
          <div>
            <label className="label">Certificate</label>
            <select
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              className="input-field bg-white"
            >
              <option value="U">U (Universal)</option>
              <option value="U/A">U/A (Parental Guidance)</option>
              <option value="A">A (Adults Only)</option>
              <option value="S">S (Special)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field bg-white"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Now Showing">Now Showing</option>
            </select>
          </div>

          {/* Language */}
          <div className="md:col-span-2">
            <label className="label">Languages (Comma separated)</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. English, Hindi, Tamil"
            />
          </div>

          {/* Genre */}
          <div className="md:col-span-2">
            <label className="label">Genres (Comma separated)</label>
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Sci-Fi, Drama, Adventure"
            />
          </div>

          {/* Cast */}
          <div className="md:col-span-2">
            <label className="label">Cast (Comma separated)</label>
            <input
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Matthew McConaughey, Anne Hathaway"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            {movie ? "Save Changes" : "Add Movie"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Helper Styles for Inputs ---
const inputStyles = `
  .label { @apply block text-xs font-bold text-gray-600 uppercase mb-1.5 tracking-wide; }
  .input-field { @apply w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white; }
`;

// --- 2. THE MOVIE CARD COMPONENT ---
function MovieCard({
  movie,
  onEdit,
  onDelete,
}: {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}) {
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full group hover:shadow-md transition-all duration-300">
      {/* Image Area */}
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm ${
            movie.status === "Now Showing" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
          }`}>
            {movie.status}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm bg-white/90 text-gray-900 backdrop-blur-sm">
            {movie.certificate}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 leading-tight" title={movie.title}>
          {movie.title}
        </h3>
        
        <div className="space-y-1.5 mb-4">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
            <span>{movie.genre}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{formatDuration(movie.duration)}</span>
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            <span className="font-semibold text-gray-700">Lang:</span> {movie.language}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Release:</span> {movie.releaseDate}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-50 pt-3">
          <button
            onClick={() => onEdit(movie)}
            className="py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition text-center"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. THE MAIN PAGE ---
export default function AdminMoviesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Mock Data
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: "1",
      title: "Kantara A Legend",
      description: "Exploring the origins of Kaadubettu Shiva...",
      posterUrl: "https://www.themoviedb.org/movie/1083637#",
      trailerUrl: "",
      duration: 165,
      genre: "Action, Drama",
      language: "Hindi, Kannada",
      releaseDate: "2025-10-02",
      certificate: "U/A",
      cast: "Rishab Shetty, Sapthami Gowda",
      status: "Now Showing",
    },
    {
      id: "2",
      title: "F1 : The Movie",
      description: "Formula 1 drama.",
      posterUrl: "https://image.tmdb.org/t/p/original/b0E63X2x443k1p4q4x3x5x6.jpg",
      trailerUrl: "",
      duration: 135,
      genre: "Drama, Sport",
      language: "English",
      releaseDate: "2025-06-25",
      certificate: "U",
      cast: "Brad Pitt, Damson Idris",
      status: "Now Showing",
    }
  ]);

  // Handlers
  const handleAddClick = () => {
    setEditingMovie(null); // Null means "Add Mode"
    setIsModalOpen(true);
  };

  const handleEditClick = (movie: Movie) => {
    setEditingMovie(movie); // Object means "Edit Mode"
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Delete this movie? This cannot be undone.")) {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSave = (movieData: Movie) => {
    if (movieData.id) {
      // Edit Existing
      setMovies((prev) => prev.map((m) => (m.id === movieData.id ? movieData : m)));
    } else {
      // Add New (Generate fake ID)
      const newMovie = { ...movieData, id: Math.random().toString() };
      setMovies((prev) => [...prev, newMovie]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Inject Styles for cleaner code */}
      <style>{inputStyles}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movie Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your film inventory and details.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search movies..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition shadow-sm whitespace-nowrap"
          >
            <Plus size={18} />
            Add Movie
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Modal */}
      <MovieFormModal
        isOpen={isModalOpen}
        movie={editingMovie}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}