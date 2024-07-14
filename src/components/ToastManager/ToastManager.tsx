import {
  toast,
  ToastOptions,
  ToastContainer as ToastifyContainer,
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.scss'

const defaultOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
}

export const ToastManager = {
  Success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options })
  },
  Error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options })
  },
  // Info: (message: string, options?: ToastOptions) => {
  //   toast.info(message, { ...defaultOptions, ...options })
  // },
  // Warning: (message: string, options?: ToastOptions) => {
  //   toast.warning(message, { ...defaultOptions, ...options })
  // },
}

export { ToastifyContainer as ToastContainer }
