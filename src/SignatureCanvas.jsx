import { useRef, useState } from "react";

export default function SignatureField() {
    const [showModal, setShowModal] = useState(false);
    const [signature, setSignature] = useState(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = "hidden";
        setTimeout(clearCanvas, 50);
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = "auto";
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const x =
            e.nativeEvent.offsetX ?? e.touches[0].clientX - canvas.offsetLeft;
        const y =
            e.nativeEvent.offsetY ?? e.touches[0].clientY - canvas.offsetTop;
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        const x =
            e.nativeEvent.offsetX ?? e.touches[0].clientX - canvas.offsetLeft;
        const y =
            e.nativeEvent.offsetY ?? e.touches[0].clientY - canvas.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleDone = () => {
        const canvas = canvasRef.current;
        setSignature(canvas.toDataURL("image/png"));
        closeModal();
    };

    return (
        <div className="p-4">
            <label className="block mb-2 font-medium">স্বাক্ষর:</label>
            <div
                className="border rounded-md p-2 cursor-pointer bg-white"
                onClick={openModal}
            >
                {signature ? (
                    <img
                        src={signature}
                        alt="signature preview"
                        className="h-20"
                    />
                ) : (
                    <span className="text-gray-400">
                        স্বাক্ষর করতে ক্লিক করুন
                    </span>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
                        <h2 className="text-lg font-medium mb-2">নিচে স্বাক্ষর করুন</h2>
                        <canvas
                            ref={canvasRef}
                            width={350}
                            height={150}
                            className="border border-gray-400 rounded-md bg-white touch-none"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={(e) => {
                                e.preventDefault();
                                startDrawing(e);
                            }}
                            onTouchMove={(e) => {
                                e.preventDefault();
                                draw(e);
                            }}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                stopDrawing(e);
                            }}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                onClick={clearCanvas}
                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleDone}
                                className="px-3 py-1 bg-green-600 text-white rounded-md"
                            >
                                Done
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-3 py-1 bg-gray-400 text-white rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
