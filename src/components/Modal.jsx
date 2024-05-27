export default function Modal({ children, isOpen }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>}

      {/* Modal */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-max w-[450px] bg-white shadow-xl z-50 rounded-2xl p-4 ${isOpen ? "block" : "hidden"}`}>{children}</div>
    </>
  );
}