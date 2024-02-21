import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const toasty = (content, option) => {
  toast(content, { progress: false, ...option });
  toast.update(option.toastId, {
    render: content,
    progress: false,
    ...option
  });
};
export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer style={{ zIndex: 99999999999 }} position="top-left" />
    </>
  );
}
export { toasty };
