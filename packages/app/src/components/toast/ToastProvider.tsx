/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
  message: string;
  type: ToastType;
  show: ShowToast;
  hide: Hide;
}>({
  ...initialState,
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastContext = () => useContext(ToastContext);
export const useToastCommand = () => {
  const { show, hide } = useToastContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);
  const visible = state.message !== "";

  const hideAfter = debounce(hide, DEFAULT_DELAY);

  const showWithHide: ShowToast = (...args) => {
    show(...args);
    hideAfter();
  };

  return (
    <ToastContext value={{ show: showWithHide, hide, ...state }}>
      {children}
      {visible && createPortal(<Toast />, document.body)}
    </ToastContext>
  );
});
