export default function Modal({ children, open }) {
  return (
    <>
      {/* Backdrop */}
      {open && <div className='fixed inset-0 bg-black bg-opacity-50 z-50'></div>}

      {/* Modal */}
      <div
        className={`container sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-max w-[450px] bg-white shadow-xl z-50 rounded-xl p-4 ${open ? 'block' : 'hidden'}`}
      >
        {children}
      </div>
    </>
  )
}
