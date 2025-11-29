"use client";

import { useEffect, useState } from "react";
import { X, Plus, Search } from "lucide-react";
import { addMovie, getAllMovies } from "@/src/actions/movies";
import {
  deleteMovie,
  editMovieDetails,
  getListedMovies,
} from "@/src/actions/admin";

// --- Types ---
interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  duration: number; // in minutes
  releaseDate: string; // YYYY-MM-DD
  genres: string; // e.g. "Action, Sci-Fi"
  languages: string; // e.g. "English, Hindi"
  certificate: "U" | "UA" | "A" | "S";
  cast: string; // e.g. "Matthew McConaughey, Anne Hathaway"
  status: "NOW_SHOWING" | "UPCOMING";
}

// --- 1. THE EDIT/ADD MODAL COMPONENT ---
function MovieFormModal({
  movie,
  isOpen,
  onClose,
  onSave,
  onSaveEditChanges,
}: {
  movie: Movie | null; // If null, we are in "Add Mode"
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Movie) => void;
  onSaveEditChanges: (movie: Movie) => void;
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
    genres: "",
    languages: "",
    certificate: "UA",
    cast: "",
    status: "UPCOMING",
  };

  const [formData, setFormData] = useState<Movie>(initialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };





  // Shared classes to ensure visibility
  const inputClasses =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">
            {movie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto bg-white">
          {/* Title (Full Width) */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Movie Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Interstellar"
            />
          </div>

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
              placeholder="Plot summary..."
            />
          </div>

          {/* Poster URL */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Poster Image URL</label>
            <input
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://image.tmdb.org/..."
            />
          </div>

          {/* Trailer URL */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Trailer Link (YouTube)</label>
            <input
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Duration */}
          <div>
            <label className={labelClasses}>Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. 169"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className={labelClasses}>Release Date</label>
            <input
              name="releaseDate"
              type="date"
              value={formData?.releaseDate}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Certificate */}
          <div>
            <label className={labelClasses}>Certificate</label>
            <select
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="U">U (Universal)</option>
              <option value="UA">UA (Parental Guidance)</option>
              <option value="A">A (Adults Only)</option>
              <option value="S">S (Special)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelClasses}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="NOW_SHOWING">Now Showing</option>
            </select>
          </div>

          {/* Language */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Languages (Comma separated)</label>
            <input
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. English, Hindi, Tamil"
            />
          </div>

          {/* Genre */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Genres (Comma separated)</label>
            <input
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Sci-Fi, Drama, Adventure"
            />
          </div>

          {/* Cast */}
          <div className="md:col-span-2">
            <label className={labelClasses}>Cast (Comma separated)</label>
            <input
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className={inputClasses}
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

          {movie ? (
            <button
              onClick={() => onSaveEditChanges(formData)}
              className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => onSave(formData)}
              className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
            >
              Add Movie
            </button>
          )}
          {/* <button
            onClick={() => onSave(formData)}
            className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            {movie ? "Save Changes" : "Add Movie"}
          </button> */}
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
  // onDelete: handleDeleteMovie()
  onDelete: (id: string) => void;
}) {
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const dateFormater = () => {
    const date = new Date(movie.releaseDate);
    // console.log(date.toLocaleDateString())

    return date.toLocaleDateString();
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
          <span
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm ${movie.status === "NOW_SHOWING" 
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white"
              }`}
          >
            {/* {console.log("this is movie",movie.status)} */}
            {/* {movie.status } */}
            {movie.status == "NOW_SHOWING" ? "NOW SHOWING" : "UPCOMING"   }
          </span>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm bg-white/90 text-gray-900 backdrop-blur-sm">
            {movie.certificate}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 leading-tight"
          title={movie.title}
        >
          {movie.title}
        </h3>

        <div className="space-y-1.5 mb-4">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
            <span>{movie.genres}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{formatDuration(movie.duration)}</span>
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            <span className="font-semibold text-gray-700">Lang:</span>{" "}
            {movie.languages}
          </p>
          <p className="text-xs text-gray-500">
            {/* {console.log("This is movie",movie.releaseDate)} */}
            <span className="font-semibold text-gray-700">Release:</span>{" "}
            {dateFormater()}
            {/* <span className="font-semibold text-gray-700">Release:</span> {()=> return  new Date(movie.releaseDate).toLocaleDateString()} */}
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
  const [listedMovies, setListedMovies] = useState<any>([]);

  useEffect(() => {
    getListedMovies().then((data) => setListedMovies(data));
  }, []);

  // Handlers
  const handleAddClick = () => {
    setEditingMovie(null); // Null means "Add Mode"
    setIsModalOpen(true);
  };

  const handleEditClick = (movie: Movie) => {
    // console.log("You got that");
    // editMovieDetails(movie).then((data) => data);
    setEditingMovie(movie); // Object means "Edit Mode"
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    console.log("This is id", id);
    if (confirm("Delete this movie? This cannot be undone.")) {
      // console.log("I am inside confitm ")
      deleteMovie(id)
        .then((data) => console.log(data))
        .then(() => getListedMovies().then((data) => setListedMovies(data)));
    }
  };

  const handleSave = async (movieData: Movie) => {
    // Prepare data object (mapping UI fields to Server Action fields)
    const payload = {
      id: movieData.id,
      title: movieData.title,
      description: movieData.description,
      posterUrl: movieData.posterUrl,
      trailerUrl: movieData.trailerUrl,
      duration: movieData.duration,
      releaseDate: movieData.releaseDate,
      genres: movieData.genres, // Map UI 'genre' to DB 'genres'
      languages: movieData.languages, // Map UI 'language' to DB 'languages'
      certificate: movieData.certificate,
      cast: movieData.cast,
      status: (movieData.status === "NOW_SHOWING"
        ? "NOW_SHOWING"
        : "UPCOMING") as "NOW_SHOWING" | "UPCOMING",
      // status: movieData.status === "NOW_SHOWING" ? "NOW_SHOWING" : "UPCOMING"
    };

    let result;
    try {
      result = await addMovie(payload);
      // console.log("This is result ", result)
      if (!result.success) {
        return;
      }
      setIsModalOpen(false);
      const data = await getListedMovies();
      setListedMovies(data);
    } catch (error) {
      throw console.error(error);
    }
    // if (movieData.id) {
    //   // Edit Logic
    //   result = await updateMovie(payload);
    // } else {
    //   // Add Logic
    //   result = await addMovie(payload);
    // }

    // if (result?.success) {
    //   setIsModalOpen(false);
    // Optional: Trigger a toast notification here
    // } else {
    //   alert("Error: " + result?.message);
    // }
  };

  const handleEditSaveChanges = (movie: Movie) => {
    console.log("you got that", movie)

    editMovieDetails(movie).then(data=> data)
  };

  return (
    <div className="space-y-8">
      {/* Inject Styles for cleaner code */}
      <style>{inputStyles}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movie Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your film inventory and details.
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full text-gray-500 pl-10 placeholder:text-gray-500 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
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
        {listedMovies?.map((movie: any) => (
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
        onSaveEditChanges={handleEditSaveChanges}
      />
    </div>
  );
}
