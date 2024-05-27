export default function Loading() {
  return (
    <div className="w-full h-screen bg-opacity-20 backdrop-blur-lg grid place-content-center z-50">
      <div className="w-24 h-24 rounded-full animate-spin ease-in-out grid place-content-center overflow-hidden bg-opacity-80 bg-white shadow-xl">
        <div className="w-full h-full flex justify-center items-center text-teal-500 text-3xl transform rotate-180">TC</div>
      </div>
    </div>
  );
}
