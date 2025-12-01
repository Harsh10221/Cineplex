"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Calendar, MapPin, X, Clock, IndianRupee, Trash2, Edit2, Theater } from "lucide-react";
import { addShowTime, getAllShowTime, getAllTheater, getSpecificeShow } from "@/src/actions/admin";
import { getAllMovies } from "@/src/actions/movies";
import { Inter_Tight, Moirai_One } from "next/font/google";

// --- Types ---
interface Showtime {
  id: string;
  time: string; // Display format: "08:00 AM"
  language: string;
  price: number;
  screen: string; // Display format: "Screen 1"
}

interface MovieSchedule {
  id: string;
  title: string;
  posterUrl: string;
  shows: Showtime[];
}

interface Theater {
  id: string;
  name: string;
  location: string;
}

// --- Mock Data ---
// const MOCK_THEATERS: Theater[] = [
//   { id: "t1", name: "PVR Icon", location: "Andheri West" },
//   { id: "t2", name: "Eros Cinema", location: "Churchgate" },
//   { id: "t3", name: "Inox", location: "Nariman Point" },
// ];

const MOCK_MOVIES: MovieSchedule[] = [
  {
    id: "m1",
    title: "Sunny Sanskari Ki Tulsi Kumari",
    posterUrl: "https://image.tmdb.org/t/p/original/gEU2QniL6E8ahDsVKboDBYG84x0.jpg",
    shows: [
      { id: "s1", time: "08:00 AM", language: "Hindi", price: 250, screen: "Screen 1" },
      { id: "s2", time: "12:00 PM", language: "Hindi", price: 350, screen: "Screen 2" },
    ]
  },
  {
    id: "m2",
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/original/gEU2QniL6E8ahDsVKboDBYG84x0.jpg",
    shows: [
      { id: "s3", time: "06:00 PM", language: "English", price: 450, screen: "IMAX" },
    ]
  }
];

// --- Helper: Convert "08:00 AM" to "08:00" for input ---
const convertTo24Hour = (time12h: string) => {
  if (!time12h) return "";
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  return `${hours.padStart(2, '0')}:${minutes}`;
};

// --- 1. SHOWTIME MODAL (Add & Edit) ---
function ShowtimeModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  movieList,
  theaterList,
  handleAddShowTime
}: {
  isOpen: boolean;
  movieList: any;
  handleAddShowTime: (data: any) => void;
  theaterList: any;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any; // If provided, we are in "Edit Mode"
}) {
  if (!isOpen) return null;

  // Determine initial state based on whether we are editing or adding
  const defaultState = {
    movieId: "",
    theaterId: "",
    time: Date(),
    price: Number,
    language: "",
    date: Date()
  };

  // If editing, map the display data back to form values
  const [formData, setFormData] = useState(
    initialData
      ? {
        movieId: initialData.movieId,
        theaterId: 0,
        screenId: initialData.screen === "Screen 1" ? "sc1" : "sc2", // Simple logic for demo
        time: new Date(initialData.time).toLocaleTimeString("en-GB"
          , {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }
        ),
        price: initialData.price,
        language: initialData.language,
        date: initialData.date
      }
      : defaultState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log("hello from hnald change", e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("This is set data", formData)
  };

  const labelClass = "block text-xs font-bold text-gray-600 uppercase mb-1.5 tracking-wide";
  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {initialData ? "Edit Showtime" : "Schedule New Show"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Select Movie */}
          <div>
            <label className={labelClass}>Select Movie</label>
            <select
              name="movieId"
              className={inputClass}
              onChange={handleChange}
              value={formData.movieId}
              disabled={!!initialData}
            >
              <option value="">-- Choose Movie --</option>
              {movieList?.map((movie: any) => (
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
          </div>

          {/* Select Screen */}
          <div>
            <label className={labelClass}>Select Screen</label>
            <select
              name="theaterId"
              className={inputClass}
              onChange={handleChange}
              value={formData?.theaterId}
            >
              {theaterList.map((theater: any) => (
                <option key={theater.name} value={theater.id}>{theater.name}</option>
              ))}
            </select>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Show Date</label>
              <input
                type="date"
                name="date"
                className={inputClass}
                onChange={handleChange}
                value={formData?.date || ''} // Ensure your state has a 'date' field
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
            </div>

            <div>
              <label className={labelClass}>Show Time</label>
              <input
                type="time"
                name="time"
                className={inputClass}
                onChange={handleChange}
                value={formData.time}
              />
            </div>
          </div>

          {/* Language & Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Language</label>
              <select
                name="language"
                className={inputClass}
                onChange={handleChange}
                value={formData.language}
              >
                <option value="">-- Select --</option>
                {movieList?.find((movie: any) => movie.id === formData.movieId)?.languages?.split(",").map((lang: string) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Ticket Price (₹)</label>
              
              <input
                type="number"
                name="price"
                placeholder="e.g. 250"
                className={inputClass}
                onChange={handleChange}
                value={formData.price}
              />

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>

          {initialData ? (
            <button onClick={() => onSave(formData)} className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm">
              Save Changes
            </button>
          ) : (
            <button onClick={() => handleAddShowTime(formData)} className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm">
              Add Showtime
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 2. MAIN PAGE COMPONENT ---
export default function ShowtimesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [theaterList, setTheaterList] = useState<any[]>([])
  const [movieList, setMovieList] = useState<any>(null)
  const [selectedTheater, setSelectedTheater] = useState(theaterList[0]?.id);
  const [availableShowList, setAvailableShowList] = useState<any[]>([])

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<any>(null);

  console.log("This is selected theater", selectedTheater)

  // useEffect(() => {
  //   getAllShowTime().then((data) => setAvailableShowList(data))
  //   // getAllShowTime().then((data)=>setAvailableShowList(data))

  // }, [])

  const handleGetShowOfDate = () => {
    console.log("This is selected date", selectedDate)

    getSpecificeShow(selectedDate, selectedTheater).then(data => setAvailableShowList(data))



  }


  const handleAddClick = () => {
    setEditingShowtime(null); // Clear edit state
    setIsModalOpen(true);
  };

  const handleEditClick = (movie: MovieSchedule, show: Showtime) => {
    // Populate the modal with this specific show's data
    setEditingShowtime({
      ...show,
      movieId: movie.id
    });
    setIsModalOpen(true);
  };

  const handleAddShowTime = (formData: any) => {
    console.log("this is from data from function", formData)
    addShowTime(formData).then(data => data).then(() => setIsModalOpen(false))

  }

  useEffect(() => {
    getAllTheater().then(data => setTheaterList(data))
    getAllMovies().then(data => setMovieList(data.Movie))
    // getAllMovies().then(data=>setMovieList(data))
  }, [])


  const handleDeleteClick = (showId: string) => {
    console.log("Delete clicked for show:", showId);
    // Logic for delete would go here
  };

  const handleSave = (data: any) => {
    if (editingShowtime) {
      console.log("Updating existing showtime:", { id: editingShowtime.id, ...data });
    } else {

      console.log("Creating new showtime:", data);


    }
    setIsModalOpen(false);
    // In real app: Call Server Action to save to DB
  };

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-8">

      {/* --- HEADER & FILTERS --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Showtimes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

          {/* Theater Dropdown */}
          <div className="w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Select Theater</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedTheater}
                onChange={(e) => setSelectedTheater(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
              >

                {theaterList?.map(t => (
                  <option key={t.id} value={t.id}>{t.name} - {t.location}</option>
                ))}


              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Date</label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
                className="w-full pl-4 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <button onClick={handleGetShowOfDate} className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
              Apply
            </button>
            <button className="px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
              Clear
            </button>

          </div>
        </div>
      </div>

      {/* --- ADD BUTTON --- */}
      <button
        onClick={handleAddClick}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md hover:shadow-lg transform active:scale-95 duration-200"
      >
        <Plus size={20} />
        Add New Showtime
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {availableShowList.length == 0 ?
          <div className="w-full flex flex-col items-center justify-center py-12 px-6 text-center bg-slate-100 border border-slate-200 rounded-2xl shadow-sm">

            {/* 1. Icon Circle (Slightly darker slate) */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm ring-1 ring-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* 2. Text (Dark Slate for Contrast) */}
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No Shows Found
            </h3>

            <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
              No showtimes are scheduled for this date.
            </p>

            {/* 3. Button (Subtle Outline) */}
            {/* <button className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm shadow-sm">
              Change Date
            </button> */}

          </div>

          : availableShowList?.map((movie) => {


            return <div key={movie.showId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

              <div className="relative h-48 bg-gray-100">
                <img src={movie?.movie?.posterUrl} alt={movie?.movie?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg leading-tight">{movie?.movie?.title}</h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {movie?.shows?.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No shows scheduled.</p>
                ) : (

                  movie?.shows?.map((show: any) => {

                    return <div key={show.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-red-200 transition group">

                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-md shadow-sm text-red-600 border border-gray-100">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{show.startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true

                          })}</p>
                          {/* {console.log("This is time",show.startTime.to())} */}
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{show.language} • {show.theater.name}</p>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-1">
                        <p className="text-sm font-bold text-gray-900 flex items-center justify-end">
                          <IndianRupee size={12} className="mr-0.5" />
                          {show.price}
                        </p>
                        <div className="flex items-center gap-2  group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditClick(movie, show)}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(show.id)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  })

                )}
              </div>
            </div>

          })}

      </div>


      <ShowtimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingShowtime}
        movieList={movieList}
        theaterList={theaterList}
        handleAddShowTime={handleAddShowTime}
      />

    </div>
  );
}