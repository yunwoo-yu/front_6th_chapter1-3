/* eslint-disable react-refresh/only-export-components */
import { useAutoCallback } from "@hanghae-plus/lib";
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { debounce } from "../../utils";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastContext = () => useContext(ToastContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const command = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastCommandContext.Provider value={command}>
      <ToastContext.Provider value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastContext.Provider>
    </ToastCommandContext.Provider>
  );
});
