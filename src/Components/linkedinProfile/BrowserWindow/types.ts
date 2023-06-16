export type Pane = {
  title: string;
  content: string | JSX.Element;
  key: string;
  closable?: boolean;
};

export type targetKeyType =
  | string
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>;

export type stateBox = {
  title: string;
  meta: {
    src: string;
    title: string;
    description: string;
  };
};

export type stateBoxOptional = {
  title?: string;
  meta?: {
    src?: string;
    title?: string;
    description?: string;
  };
};
