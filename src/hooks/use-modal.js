import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState({ show: false, row: {} })

  const onClose = () => {
    setIsOpen({ show: false, row: {} })
  }

  const onOpen = (row = {}) => {
    setIsOpen({ show: true, row })
  }

  return {
    isOpen: isOpen.show,
    selectedRow: isOpen.row,
    onClose,
    onOpen
  }
}

export default useModal
