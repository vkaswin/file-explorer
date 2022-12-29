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
      folders: [],
      expandedFolderIds: [],
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
      localStorage.setItem("folders", JSON.stringify(this.folders));
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
      localStorage.setItem("folders", JSON.stringify(this.folders));
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
      let index = this.expandedFolderIds.indexOf(id);
      if (index === -1) {
        this.expandedFolderIds.push(id);
      } else {
        this.expandedFolderIds.splice(index, 1);
      }
      localStorage.setItem(
        "expandedFolderIds",
        JSON.stringify(this.expandedFolderIds)
      );
    },
    expandFolder(id: string) {
      let isExist = this.expandedFolderIds.includes(id);
      if (!isExist) {
        this.expandedFolderIds.push(id);
        localStorage.setItem(
          "expandedFolderIds",
          JSON.stringify(this.expandedFolderIds)
        );
      }
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
      localStorage.setItem("folders", JSON.stringify(this.folders));
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
    setFolders(folders: Folder[]) {
      this.folders = folders;
    },
    setExpandedFolderIds(folderIds: string[]) {
      this.expandedFolderIds = folderIds;
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
