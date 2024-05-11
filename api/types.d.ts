export interface Page {
  name: string;
  url: string;
  blocks: Block[];
}

export interface Block {
  nameComponent: string;
  content: { [key: string]: string };
}

export interface ModelType {
  [key: string]: any;
}
