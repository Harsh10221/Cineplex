import React from 'react';

/**
 * A custom-styled checkbox component for a single seat in a seating chart.
 *
 * @param {object} props
 * @param {string} props.id - Unique ID for the seat (e.g., "A1", "B5").
 * @param {number} props.number - The seat number to display (e.g., 1, 5, 10).
 * @param {'available' | 'occupied' | 'selected'} props.status - Current status of the seat.
 * @param {boolean} props.isChecked - Controlled prop: true if the seat is selected, false otherwise.
 * @param {(seatId: string) => void} props.onToggle - Callback when the seat is clicked/toggled.
 */
function SeatCheckbox({ id, number, status, isChecked, onToggle }: any) {
    // Determine base classes for the LABEL (the visual part)
    let labelClasses = `
        relative             /* Needed for custom styles on pseudo-elements if you get more advanced */
        p-1 w-8 h-8          /* Size of the seat button */
        flex items-center justify-center /* Center the number */
        rounded-md           /* Rounded corners */
        text-sm font-medium  /* Font styling */
        border-2             /* Border for the seat */
        transition-all duration-150 ease-in-out /* Smooth transitions */
        cursor-pointer       /* Indicates it's clickable */
    `;

    // Add status-specific default styles
    if (status === 'occupied') {
        // Occupied seats are grayed out and not interactive
        labelClasses += ' bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed';
    } else {
        // Available and (initially) unselected seats
        labelClasses += ' bg-white border-gray-300 text-gray-800';
    }

    // This is the critical part: Styling when the hidden input is CHECKED
    // The `peer-checked` utility class relies on the input having `peer`
    // and the label being an adjacent sibling.
    if (status !== 'occupied') { // Only apply checked styles if it's not occupied
        labelClasses += `
            peer-checked:bg-red-500 
            peer-checked:border-red-500 
            peer-checked:text-white 
            peer-checked:shadow-md 
            peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/50
        `;
    }

    return (
        <>
            {/* 1. The ACTUAL hidden checkbox input */}
            <input
                type="checkbox"
                id={id} // Link input to label
                className='peer hidden' // 🛑 CRITICAL: Hide the native input and mark it as 'peer'
                checked={isChecked} // Controlled by parent state
                // onChange={() => onToggle(id)} // Callback to update parent state
                disabled={status === 'occupied'} // Occupied seats are disabled
                onChange={() => onToggle(id)}
                aria-label={`Seat ${id}`} // Accessibility
            />

            {/* 2. The VISUAL label that looks like the seat button */}
            <label
                htmlFor={id} // Link label to input
                className={labelClasses}
            >
                {number} {/* Display the seat number */}
            </label>
        </>
    );
}

export default SeatCheckbox;