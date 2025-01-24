import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
  ({
  fGroupClassName,
  fControlWrapClassName,
  fControlClassName,
  label,
  labelRight,
  labelLeftClassName,
  labelRightClassName,
  labelClassName,
  iconLeft,
  iconRight,
  onClickIconLeft,
  onClickIconRight,
  prependClassName,
  appendClassName,
  inputRef,
  labelBottom,
  labelBottomLeft,
  labelBLeftClassName,
  labelBottomRight,
  labelBRightClassName,
  ...props
}: any,
ref: any) => {
  // Added ref parameter for forwarding
return (
    <div className={twMerge("mb-5", fGroupClassName)}>
      <div className={twMerge("flex justify-between", labelClassName)}>
        {label && (
          <label
            className={twMerge(
              "text-34345b font-medium flex-wrap flex justify-start items-center mb-1.5 leading-5 pr-1",
              labelLeftClassName
            )}
          >
            {label}
          </label>
        )}
        {labelRight && (
          <label
            className={twMerge(
              "text-acacac font-medium flex-wrap justify-end flex items-center mb-1.5 leading-5 pl-1",
              labelRightClassName
            )}
          >
            {labelRight}
          </label>
        )}
      </div>
      <div
        className={twMerge(
          "relative flex  border border-sollid focus:border focus-within:border-[#63c121] rounded-md w-full",
          fControlWrapClassName
        )}
      >
        {iconLeft && (
          <button
            className={twMerge(
              "px-3 bg-none border-0 inline-flex items-center",
              prependClassName
            )}
            onClick={onClickIconLeft}
          >
            {iconLeft}
          </button>
        )}
        <input
          className={twMerge(
            "flex-1 py-1.5 px-4 text-sm bg-transparent rounded-md leading-8 border-0 text-181a1e w-[1%] focus:outline-none",
            fControlClassName
          )}
          ref={inputRef}
          {...props}
        />
        {iconRight && (
          <button
            type="button"
            className={twMerge(
              "px-3 bg-none border-0 inline-flex items-center",
              appendClassName
            )}
            onClick={onClickIconRight}
          >
            {iconRight}
          </button>
        )}
      </div>
      {labelBottom && (
        <div
          className={twMerge("flex justify-between pt-[2px]", labelClassName)}
        >
          {labelBottomLeft && (
            <label
              className={twMerge(
                "text-gray-2 font-gilroyMedium flex justify-start flex-wrap items-center mb-1.5  pr-1",
                labelBLeftClassName
              )}
            >
              {labelBottomLeft}
            </label>
          )}
          {labelBottomRight && (
            <label
              className={twMerge(
                "text-acacac font-gilroyMedium flex justify-end flex-wrap items-center mb-1.5  pl-1",
                labelBRightClassName
              )}
            >
              {labelBottomRight}
            </label>
          )}
        </div>
      )}
    </div>
  );
}
);

export default Input;
