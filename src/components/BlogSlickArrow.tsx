import React from 'react';
import Image from 'next/image'; // Import this if you're using Next.js

const CustomPrevArrow = (props:any) => {
    const { className, onClick } = props;
    return (
        <button
            className={`custom-prev ${className}`}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <Image src="/right-arrow.png" width={14} height={14} alt="Previous" />
        </button>
    );
};

const CustomNextArrow = (props:any) => {
    const { className, onClick } = props;
    return (
        <button
            className={`custom-next ${className}`}
            onClick={onClick}
            aria-label="Next Slide"
        >
            <Image src="/left-arrow.png" width={14} height={14} alt="Next" />
        </button>
    );
};

export { CustomPrevArrow, CustomNextArrow };