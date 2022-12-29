import { defineStore } from "pinia";
import {
  AddSubFolder,
  Folder,
  FolderState,
  GetRootFolder,
  GroupFoldersByPath,
  SortFunction,
  DragSource,
  DragDestination,
  AddType,
  Files,
} from "@/types/Folder";

export const useFolder = defineStore("folder", {
  state: (): FolderState => {
    return {
      selectedId: null,
      addType: null,
      title: "",
      error: null,
      drag: {
        source: {
          folderId: null,
          type: null,
          fileId: null,
        },
        destination: {
          folderId: null,
        },
      },
      expandedFolders: [
        // "e0424902-6937-4741-aff9-02fffae995aa",
        // "fc5c2979-b629-4498-bf00-91e4087080ef",
        // "b3c4da9e-7283-464f-9eda-f864aa46f9a5",
        // "6154f081-fadd-465f-8d15-83fad5375761",
        // "653e7dd0-bd0c-4fc7-8f9c-696cd2c896c0",
        // "af36c726-6ace-4fd9-b06c-1ce6fcba4d71",
        // "213eacc6-6d95-48fb-85eb-01d400a58824",
      ],
      folders: [
        {
          id: "1",
          title: "src",
          path: "/src",
          files: [
            {
              id: "11",
              title: "index.js",
              path: "/src/index.js",
            },
          ],
        },
        {
          id: "2",
          title: "node_modules",
          path: "/node_modules",
          files: [],
        },
        {
          id: "3",
          title: "store",
          path: "/store",
          files: [],
        },
        {
          id: "4",
          title: "helper",
          path: "/helper",
          files: [],
        },
        {
          id: "5",
          title: "components",
          path: "/components",
          files: [],
        },
        {
          id: "6",
          title: "dist",
          path: "/dist",
          files: [],
        },
        {
          id: "7",
          title: "types",
          path: "/types",
          files: [],
        },
        {
          id: "8",
          title: "public",
          path: "/public",
          files: [
            {
              id: "81",
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: "82",
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: "9",
          title: "assets",
          path: "/public/assets",
          files: [
            {
              id: "91",
              title: "index.html",
              path: "/public/assets/index.html",
            },
            {
              id: "92",
              title: "favicon.ico",
              path: "/public/assets/favicon.ico",
            },
          ],
        },
        {
          id: "10",
          title: "images",
          path: "/public/assets/images",
          files: [
            {
              id: "101",
              title: "index.html",
              path: "/public/assets/images/index.html",
            },
            {
              id: "102",
              title: "favicon.ico",
              path: "/public/assets/images/favicon.ico",
            },
          ],
        },
        {
          id: "11",
          title: "js",
          path: "/public/assets/js",
          files: [
            {
              id: "111",
              title: "index.html",
              path: "/public/assets/js/index.html",
            },
            {
              id: "112",
              title: "favicon.ico",
              path: "/public/assets/js/favicon.ico",
            },
          ],
        },
        {
          id: "12",
          title: "html",
          path: "/public/html",
          files: [
            {
              id: "121",
              title: "index.html",
              path: "/public/html/index.html",
            },
            {
              id: "122",
              title: "favicon.ico",
              path: "/public/html/favicon.ico",
            },
          ],
        },
        {
          id: "13",
          title: "Hello",
          path: "/src/Test/Demo/Hello",
          files: [
            {
              id: "131",
              title: "style.scss",
              path: "/src/Test/Demo/Hello/style.scss",
            },
            {
              id: "132",
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: "133",
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: "14",
          title: "World",
          path: "/src/World",
          files: [
            {
              id: "141",
              title: "hello.js",
              path: "/src/World/hello.js",
            },
            {
              id: "142",
              title: "index.js",
              path: "/src/World/index.js",
            },
          ],
        },
        {
          id: "15",
          title: "Bye",
          path: "/src/Test/Demo/Hello/Bye",
          files: [
            {
              id: "151",
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: "152",
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: "16",
          title: "World",
          path: "/src/Test/Demo/World",
          files: [
            {
              id: "161",
              title: "hello.js",
              path: "/src/Test/Demo/World/hello.js",
            },
            {
              id: "162",
              title: "index.js",
              path: "/src/Test/Demo/World/index.js",
            },
          ],
        },
        {
          id: "17",
          title: "Demo",
          path: "/src/World/Demo",
          files: [
            {
              id: "171",
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: "172",
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: "18",
          title: "Test",
          path: "/src/Test",
          files: [
            {
              id: "181",
              title: "test.js",
              path: "/src/Test/test.js",
            },
          ],
        },
        {
          id: "19",
          title: "Demo",
          path: "/src/Test/Demo",
          files: [
            {
              id: "191",
              title: "demo.js",
              path: "/src/Test/Demo/demo.js",
            },
            {
              id: "192",
              title: "index.js",
              path: "/src/Test/Demo/index.js",
            },
          ],
        },
        {
          id: "20",
          title: "utils",
          path: "/utils",
          files: [
            {
              id: "201",
              title: "index.js",
              path: "/utils/index.js",
            },
          ],
        },
        {
          id: "21",
          title: "cookies",
          path: "/utils/cookies",
          files: [
            {
              id: "211",
              title: "index.js",
              path: "/utils/cookies/index.js",
            },
          ],
        },
        {
          id: "22",
          title: "helper",
          path: "/src/Helper",
          files: [
            {
              id: "221",
              title: "util.js",
              path: "/src/helper/util.js",
            },
            {
              id: "222",
              title: "demo.js",
              path: "/src/helper/demo.js",
            },
            {
              id: "223",
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
        id: `${this.folders.length + 1}`,
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      this.folders.push(folder);
      this.toggleAddIcon();
    },
    createFile() {
      if (this.error !== null || !this.selectedFolder) return;
      let file: Files = {
        id: `${this.selectedFolder.id}${this.selectedFolder.files.length + 1}`,
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
        this.expandFolder(this.selectedId);
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
    expandFolder(id: string) {
      let isExist = this.expandedFolders.includes(id);
      if (!isExist) this.expandedFolders.push(id);
    },
    updateDragSource(source: DragSource) {
      this.drag.source = source;
    },
    updateDragDestination(destination: DragDestination) {
      this.drag.destination = destination;
    },
    handleDrop() {
      let { source, destination } = this.drag;
      let sourceFolder: Folder | undefined,
        destinationFoler: Folder | undefined;

      for (let folder of this.folders) {
        if (!sourceFolder && folder.id === source.folderId) {
          sourceFolder = folder;
        } else if (!destinationFoler && folder.id === destination.folderId) {
          destinationFoler = folder;
        } else if (sourceFolder && destinationFoler) break;
      }
      if (!sourceFolder || !destinationFoler) return;

      if (source.type === "file") {
        let index = sourceFolder.files.findIndex(
          ({ id }) => id === source.fileId
        );
        if (index === -1) return;
        let file = { ...sourceFolder.files[index] };
        file.path = `${destinationFoler.path}/${file.title}`;
        sourceFolder.files.splice(index, 1);
        destinationFoler.files.push(file);
      } else {
        let path = sourceFolder.path;
        let title = sourceFolder.title;
        for (let folder of this.folders) {
          if (folder.path.startsWith(path)) {
            folder.path = folder.path.replace(
              path,
              `${destinationFoler.path}/${title}`
            );
          }
        }
      }
      this.resetDrag();
    },
    resetDrag() {
      this.drag = {
        source: {
          folderId: null,
          type: null,
          fileId: null,
        },
        destination: {
          folderId: null,
        },
      };
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
