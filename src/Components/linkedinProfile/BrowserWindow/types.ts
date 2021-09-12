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
