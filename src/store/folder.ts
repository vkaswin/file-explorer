import { defineStore } from "pinia";
import {
  AddSubFolder,
  Folder,
  GetRootFolder,
  GroupFoldersByPath,
  SortFunction,
  AddType,
  Files,
} from "@/types/Folder";

export type State = {
  selectedId: string | null;
  addType: AddType;
  title: string;
  error: string | null;
  expandedFolders: string[];
  folders: Folder[];
};

export const useFolder = defineStore("folder", {
  state: (): State => {
    return {
      selectedId: null,
      addType: null,
      title: "",
      error: null,
      expandedFolders: [],
      folders: [
        {
          id: crypto.randomUUID(),
          title: "src",
          path: "/src",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "node_modules",
          path: "/node_modules",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "store",
          path: "/store",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "helper",
          path: "/helper",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "components",
          path: "/components",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "dist",
          path: "/dist",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "types",
          path: "/types",
          files: [],
        },
        {
          id: crypto.randomUUID(),
          title: "public",
          path: "/public",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "assets",
          path: "/public/assets",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/assets/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/assets/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "images",
          path: "/public/assets/images",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/assets/images/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/assets/images/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "js",
          path: "/public/assets/js",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/assets/js/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/assets/js/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "html",
          path: "/public/html",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/html/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/html/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Hello",
          path: "/src/Test/Demo/Hello",
          files: [
            {
              id: crypto.randomUUID(),
              title: "style.scss",
              path: "/src/Test/Demo/Hello/style.scss",
            },
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "World",
          path: "/src/World",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Bye",
          path: "/src/Test/Demo/Hello/Bye",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "World",
          path: "/src/Test/Demo/World",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/Test/Demo/World/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/World/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Demo",
          path: "/src/World/Demo",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Test",
          path: "/src/Test",
          files: [
            {
              id: crypto.randomUUID(),
              title: "test.js",
              path: "/src/Test/test.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Demo",
          path: "/src/Test/Demo",
          files: [
            {
              id: crypto.randomUUID(),
              title: "demo.js",
              path: "/src/Test/Demo/demo.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "utils",
          path: "/utils",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/utils/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "cookies",
          path: "/utils/cookies",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/utils/cookies/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "helper",
          path: "/src/Helper",
          files: [
            {
              id: crypto.randomUUID(),
              title: "util.js",
              path: "/src/helper/util.js",
            },
            {
              id: crypto.randomUUID(),
              title: "demo.js",
              path: "/src/helper/demo.js",
            },
            {
              id: crypto.randomUUID(),
              title: "service.js",
              path: "/src/helper/service.js",
            },
          ],
        },
      ],
    };
  },
  getters: {
    foldersList: (state): Folder[] => {
      let folders = JSON.parse(JSON.stringify(state.folders));
      return groupFoldersByPath(folders);
    },
    selectedFolder: (state): Folder | undefined => {
      if (!state.selectedId) return;
      return state.folders.find(({ id }) => id === state.selectedId);
    },
    existingFolders: (state): string[] => {
      if (!state.selectedId) return [];
      let folder = state.folders.find(({ id }) => id === state.selectedId);
      if (!folder) return [];
      return state.folders
        .filter(
          ({ path }) =>
            path !== folder!.path &&
            path.startsWith(folder!.path) &&
            !path.substring(folder!.path.length + 1).includes("/")
        )
        .map(({ title }) => title.toLocaleLowerCase());
    },
    existingFiles: (state): string[] => {
      if (!state.selectedId) return [];
      let folder = state.folders.find(({ id }) => id === state.selectedId);
      if (!folder) return [];
      return folder.files.map(({ title }) => title.toLocaleLowerCase());
    },
  },
  actions: {
    createFolder() {
      if (this.error !== null) return;
      let folder: Folder = {
        files: [],
        id: crypto.randomUUID(),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      this.folders.push(folder);
      this.toggleAddIcon();
    },
    createFile() {
      if (this.error !== null) return;
      let file: Files = {
        id: crypto.randomUUID(),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : this.title,
      };
      let index = this.folders.findIndex(({ id }) => id === this.selectedId);
      if (index === -1) return;
      this.folders[index].files.push(file);
      this.toggleAddIcon();
    },
    updateFolder(folderId: string, folder: Folder) {
      let folders = this.folders;
      let index = folders.findIndex(({ id }) => id === folderId);
      let subFolders = folders[index].subFolders;
      if (Array.isArray(subFolders)) {
        subFolders.push(folder);
      } else {
        subFolders = [folder];
      }
    },
    deleteFolder(folderId: string) {
      let folders = this.folders;
      let index = folders.findIndex(({ id }) => id === folderId);
      folders.splice(index, 1);
    },
    updateSelectedId(id: string) {
      this.selectedId = id;
    },
    toggleAddIcon(type: AddType = null) {
      this.addType = type;
      if (!type) {
        this.title = "";
        this.error = null;
      } else {
        if (!this.selectedId) return;
        let isExist = this.expandedFolders.includes(this.selectedId);
        if (!isExist) this.expandedFolders.push(this.selectedId);
      }
    },
    setError(value: string | null = null) {
      this.error = value;
    },
    toggleFolder(id: string) {
      let index = this.expandedFolders.indexOf(id);
      if (index === -1) {
        this.expandedFolders.push(id);
      } else {
        this.expandedFolders.splice(index, 1);
      }
    },
  },
});

const addSubFolder: AddSubFolder = (folder, rootFolder) => {
  let folderPath = folder.path.split("/");
  folderPath.pop();
  let path = folderPath.join("/");

  if (rootFolder.path === path) {
    if (rootFolder.subFolders) {
      rootFolder.subFolders.push(folder);
    } else {
      rootFolder.subFolders = [folder];
    }
    return;
  }

  if (!Array.isArray(rootFolder.subFolders)) return;

  let subFolder = rootFolder.subFolders.find((folder) => {
    return path.startsWith(folder.path);
  });

  if (!subFolder) return;

  addSubFolder(folder, subFolder);
};

const getRootFolder: GetRootFolder = (path, rootFolders) => {
  let folder = rootFolders.find(
    (folder) => folder.path.substring(1) === path.substring(1).split("/")[0]
  );
  return folder;
};

export const groupFoldersByPath: GroupFoldersByPath = (folders) => {
  let rootFolders: Folder[] = [];
  let subFolders: Folder[] = [];

  for (const folder of folders) {
    folder.path.substring(1).includes("/")
      ? subFolders.push(folder)
      : rootFolders.push(folder);
  }

  subFolders = subFolders.sort((a, b) =>
    a.path.split("/").length > b.path.split("/").length ? 1 : -1
  );

  for (let folder of subFolders) {
    let rootFolder = getRootFolder(folder.path, rootFolders);
    if (!rootFolder) continue;
    addSubFolder(folder, rootFolder);
  }

  rootFolders = rootFolders.sort(sortFunction);

  for (let folder of rootFolders) {
    folder.files = folder.files.sort(sortFunction);
  }

  for (let i = 0; i < rootFolders.length; i++) {
    let rootFolder = rootFolders[i];
    rootFolders[i] = sortSubFoldersAndFiles(rootFolder);
  }

  return rootFolders;
};

const sortFunction: SortFunction = (a, b) =>
  a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());

const sortSubFoldersAndFiles = (rootFolder: Folder): Folder => {
  if (
    !Array.isArray(rootFolder.subFolders) ||
    rootFolder.subFolders.length === 0
  )
    return rootFolder;

  rootFolder.subFolders = rootFolder.subFolders.sort(sortFunction);

  for (let i = 0; i < rootFolder.subFolders.length; i++) {
    let subFolders = rootFolder.subFolders[i];
    subFolders.files = subFolders.files.sort(sortFunction);
    rootFolder.subFolders[i] = sortSubFoldersAndFiles(subFolders);
  }
  return rootFolder;
};
