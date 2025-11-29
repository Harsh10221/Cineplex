"use client";

import { useEffect, useState } from "react";
import { Search, Plus, MapPin, X, Building2, Edit2, Trash2 } from "lucide-react";
import { addTheater, deleteTheater, getAllTheater } from "@/src/actions/admin";

// --- Types ---
interface Theater {
  id: string;
  name: string;
  location: string;
  city: string;
}

// --- Mock Data ---
const MOCK_THEATERS: Theater[] = [
  { id: "1", name: "Eros Cinema", location: "Churchgate", city: "Mumbai" },
  { id: "2", name: "INOX", location: "Nehru Place", city: "Delhi" },
  { id: "3", name: "INOX R-City", location: "Ghatkopar", city: "Mumbai" },
  { id: "4", name: "Liberty Cinema", location: "Marine Lines", city: "Mumbai" },
  { id: "5", name: "PVR IMAX", location: "Pushp Vihar", city: "Delhi" },
];

// --- 1. ADD THEATER MODAL ---
function TheaterModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Theater, "id">) => void;
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const labelClass = "block text-xs font-bold text-gray-600 uppercase mb-1.5 tracking-wide";
  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add New Theater</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          
          {/* Name */}
          <div>
            <label className={labelClass}>Theater Name</label>
            <input 
              name="name" 
              placeholder="e.g. PVR Icon" 
              className={inputClass} 
              onChange={handleChange}
            />
          </div>

          {/* Location (Area) */}
          <div>
            <label className={labelClass}>Location / Area</label>
            <input 
              name="location" 
              placeholder="e.g. Andheri West" 
              className={inputClass} 
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div>
            <label className={labelClass}>City</label>
            <select name="city" className={inputClass} onChange={handleChange}>
              <option value="">Select City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm">
            Save Theater
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 2. MAIN PAGE COMPONENT ---
export default function TheatersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCity, setFilterCity] = useState("All");
  const [theaters, setTheaters] = useState<Theater[]>([]);

  const handleSave = (newTheater: Omit<Theater, "id">) => {
    
    // const theaterWithId = { ...newTheater, id: Math.random().toString() };
    // setTheaters([...theaters, theaterWithId]);
    addTheater(newTheater)
    .then(()=>getAllTheater().then((data)=>setTheaters(data)))
    
    
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllTheater().then(data => setTheaters(data))
    // getAllTheater().then(data => setTheaters(data)
    
  }, [])

  const handleDetele = (theaterId:string) => {
    deleteTheater(theaterId).then(()=>getAllTheater().then((data)=>setTheaters(data)))
  }
  

  // Filter Logic
  const filteredTheaters = filterCity === "All" 
    ? theaters 
    : theaters.filter(t => t.city === filterCity);

  // Get unique cities for dropdown
  const cities = ["All", ...Array.from(new Set(theaters.map(t => t.city)))];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Theaters</h1>
          <p className="text-sm text-gray-500 mt-1">Manage cinema halls and locations.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Filter Dropdown */}
          <div className="relative flex-1 md:w-48">
            <select 
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer shadow-sm"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city === "All" ? "Filter by City" : city}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Add Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition shadow-sm whitespace-nowrap"
          >
            <Plus size={18} />
            Add New Theater
          </button>
        </div>
      </div>

      {/* --- THEATER LIST (Card Style for Mobile, Table for Desktop) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 bg-gray-50/50 px-6 py-3 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-5">Theater Name</div>
          <div className="col-span-4">Location</div>
          <div className="col-span-2 text-right">City</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-100">
          {filteredTheaters.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No theaters found for this city.</div>
          ) : (
            filteredTheaters.map((theater) => (
              <div 
                key={theater.id} 
                className="group md:grid md:grid-cols-12 px-6 py-4 hover:bg-gray-50/50 transition flex flex-col gap-1 md:gap-0 items-start md:items-center"
              >
                {/* Name */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 transition">
                    <Building2 size={16} />
                  </div>
                  <span className="font-semibold text-gray-900">{theater.name}</span>
                </div>

                {/* Location */}
                <div className="col-span-4 text-sm text-gray-600 flex items-center gap-2 md:block">
                  <MapPin size={14} className="md:hidden text-gray-400" />
                  {theater.location}
                </div>

                {/* City */}
                <div className="col-span-2 md:text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {theater.city}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity">
                  {/* <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors" title="Edit">
                    <Edit2 size={16} />
                  </button> */}

                  <button onClick={()=>handleDetele(theater.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      <TheaterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
      />

    </div>
  );
}