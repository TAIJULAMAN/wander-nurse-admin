import { toast } from "react-hot-toast";
import { BiSolidError } from "react-icons/bi";
import { IoMdAlert } from "react-icons/io";
import { MdCelebration } from "react-icons/md";

export const toastWarning = ({ message = "" }) => {
  toast(message, {
    icon: <IoMdAlert className="text-warning" size={28} />,
  });
};

export const toastError = ({ message = "" }) => {
  toast.error(message, {
    icon: <BiSolidError className="text-inputError" size={28} />,
  });
};

export const toastSuccess = ({ message = "" }) => {
  toast.success(message, {
    icon: <MdCelebration className="text-teal" size={28} />,
  });
};
