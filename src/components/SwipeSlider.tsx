"use client";
import Slider from "react-slick"
export default function SwipeSlider({ sliderSettings, children }: any) {
    return (
        <Slider {...sliderSettings}>
            {children}
        </Slider>
    );
}