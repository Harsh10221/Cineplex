
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';


// 1. Reusable Option Button
// Handles both Links (for navigation) and Buttons (for actions)
const LanguageOption = ({ label, onClick, href }: { label: string, onClick?: () => void, href?: string }) => {
  const commonClasses = `
    w-full
    py-4
    rounded-xl
    font-semibold
    text-base
    transition-all duration-300
    
    /* Default Dark State */
    bg-white/5 
    border border-white/10
    text-gray-300
    
    /* Hover State - lit up with Red brand color */
    hover:bg-red-600 
    hover:border-red-600 
    hover:text-white
    hover:shadow-lg hover:shadow-red-600/30
    hover:-translate-y-0.5
    
    active:scale-[0.98]
    flex items-center justify-center
  `;

  if (href) {
    return (
      // Changed Link to a for preview compatibility
      <a href={href} className={commonClasses}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {label}
    </button>
  );
};

// 2. Main Modal Component
function LanguageModal({ movieData, onClose, onSelect }: any) {

  // const router = useRouter()
  // const pathname = useParams()
  // const searchParams = useSearchParams()

  // console.log("pathname",pathname)
  // console.log("searchparams",searchParams)

  // const handleNavigateToSeats = () => {
  //   const currentPath = pathname


  // }


  return (
    // Overlay (Backdrop) with Blur
    // z-[100] ensures it sits on top of everything
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Dark blurred background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Card - Dark Theme */}
      <div className="
        relative 
        w-full max-w-sm 
        bg-[#16213e] /* Matches App Theme */
        border border-white/10
        rounded-3xl 
        p-8 
        shadow-2xl shadow-black/50
        animate-in fade-in zoom-in-95 duration-300
      ">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Select Language</h2>
            <p className="text-xs text-gray-400 mt-1">Choose your preferred audio language</p>
          </div>

          {/* Close Button (X) */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Buttons List */}
        <div className="flex flex-col space-y-3">
          {/* Option 1 */}
          {/* {
            console.log("moviedata",movieData.languages.split(","))
          } */}
          {movieData?.languages?.split(",").map((item: any) => (

            // console.log("item",item)

            <Link key={item} href={`/movie/${movieData?.id}/shows?lang=${item}`}  >
              <LanguageOption
                label={item}
              />
            </Link>

          ))}


        </div>

      </div>
    </div>
  );
}

export default LanguageModal;