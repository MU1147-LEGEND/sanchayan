const CheckBoxwithLabel = (text, isAgreed, setError, setIsAgreed) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 ">
                <input
                    type="checkbox"
                    className="peer hidden"
                    checked={isAgreed}
                    onChange={(e) => {
                        setError("");
                        setIsAgreed(e.target.checked);
                    }}
                    name="checkTerms"
                />
                <svg
                    className="z-50 w-4 h-4 text-black transition-all duration-200 scale-0 opacity-0 peer-checked:scale-100 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <span className="text-sm text-black">
                আমি নিরাপত্তা নীতিসমুহের সাথে একমত প্রকাশ করছি।
            </span>{" "}
            <br />
        </label>
    );
};
export default CheckBoxwithLabel;
