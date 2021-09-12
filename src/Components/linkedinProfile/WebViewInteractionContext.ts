import React from 'react';
import { WebViewInteraction } from '../../WebViewInteraction';

type WebViewInteractionContextType = {
  interaction: WebViewInteraction | undefined;
  setInteraction: React.Dispatch<
    React.SetStateAction<WebViewInteraction | undefined>
  >;
};

const WebViewInteractionContext = React.createContext<
  WebViewInteractionContextType | undefined
>(undefined);

export const useWebViewInteraction = () =>
  React.useContext(WebViewInteractionContext)!;
export { WebViewInteractionContext };
