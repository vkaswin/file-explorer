export type Files = {
  id: string;
  title: string;
  path: string;
};

export type Folder = {
  id: string;
  title: string;
  path: string;
  files: Files[];
  subFolders?: Folder[];
};

export type AddSubFolder = (folder: Folder, rootFolder: Folder) => void;

export type GetRootFolder = (
  path: string,
  rootFolders: Folder[]
) => Folder | undefined;

export type GroupFoldersByPath = (folders: Folder[]) => Folder[];

export type SortFunction = <T extends { title: string }>(a: T, b: T) => number;

export type AddType = "file" | "folder" | null;

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}
