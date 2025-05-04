export default function Modal({ children, open }) {
  return (
    <>
      {/* Backdrop */}
      {open && <div className='fixed inset-0 z-50 bg-black bg-opacity-50'></div>}

      {/* Modal */}
      <div
        className={`container fixed left-1/2 top-1/2 z-50 h-max w-[450px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-4 shadow-xl sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] ${open ? 'block' : 'hidden'}`}
      >
        {children}
      </div>
    </>
  )
}
