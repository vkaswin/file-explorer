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
  ActionType,
  Files,
} from "@/types/Folder";

const initialValue: Folder[] = [
  {
    id: "37375e14-e00f-4af0-9cb0-4caa5858a084",
    title: "src",
    path: "/src",
    files: [],
  },
  {
    id: "1723237d-4f5c-4417-bbdc-7ddf94dad885",
    title: "node_modules",
    path: "/node_modules",
    files: [],
  },
  {
    id: "42e69ea4-de9f-4ce7-ab36-4223a343733f",
    title: "store",
    path: "/store",
    files: [],
  },
  {
    id: "e2bc9c56-ba65-4ad7-bd52-1b3c2e50ed97",
    title: "components",
    path: "/src/components",
    files: [
      {
        id: "7153eec6-c1c9-40ac-8044-5a1c6f217b9a",
        title: "index.js",
        path: "/src/components/index.js",
      },
    ],
  },
  {
    id: "7c7f8484-01cc-410a-84c9-02e69deda4a4",
    title: "public",
    path: "/public",
    files: [
      {
        id: "21c1cfba-0938-44cb-b131-30d997a0da9b",
        title: "favicon.ico",
        path: "/public/favicon.ico",
      },
      {
        id: "ecf20273-8f16-4032-8c2a-1f89a1c2b548",
        title: "index.html",
        path: "/public/index.html",
      },
    ],
  },
  {
    id: "81926f68-5600-478b-89a6-e5072345ce73",
    title: "assets",
    path: "/src/assets",
    files: [],
  },
  {
    id: "81926f68-5600-478b-89a6-e5072345ce73",
    title: "scss",
    path: "/src/assets/scss",
    files: [
      {
        id: "bb987d93-173c-439f-b2bf-e421bbcc4e53",
        title: "index.html",
        path: "/src/assets/scss/index.scss",
      },
    ],
  },
  {
    id: "c9c0319b-f1c5-4684-9366-ae4207fdd01b",
    title: "images",
    path: "/public/assets/images",
    files: [
      {
        id: "bc08fe7c-531c-4850-a060-fd8f61432a2c",
        title: "logo.png",
        path: "/public/assets/images/logo.png",
      },
    ],
  },
  {
    files: [
      {
        id: "e4b120ff-5136-4d1f-a5cb-44b4ce32892c",
        title: "favicon.ico",
        path: "/dist/favicon.ico",
      },
      {
        id: "fc26a324-dbdd-4a57-9e5a-eda4c7d19fb5",
        title: "index.html",
        path: "/dist/index.html",
      },
    ],
    id: "9b170b3e-3588-4d09-be0c-1fa392652e89",
    title: "dist",
    path: "/dist",
  },
  {
    files: [],
    id: "d8cc68b6-de8e-433f-be26-33fbaa6c8cd7",
    title: "css",
    path: "/dist/css",
  },
  {
    files: [],
    id: "f0763a01-b47d-4129-bcf8-ec1a7992c9e3",
    title: "js",
    path: "/dist/js",
  },
  {
    files: [],
    id: "89c917ae-9c7a-41ee-9952-8c9965421947",
    title: "img",
    path: "/dist/img",
  },
  {
    files: [],
    id: "2532043f-71ae-4a1c-ae04-bff3361b7946",
    title: "fonts",
    path: "/dist/fonts",
  },
  {
    id: "706c8792-6e41-4785-930e-50d9b678edb3",
    path: "/",
    title: "",
    files: [
      {
        id: "9496cc8a-43e5-40c4-8c25-2d75b0cd7b04",
        path: "/README.md",
        title: "README.md",
      },
      {
        id: "39f1657c-c48e-490e-8c29-1c80ddd2042c",
        path: "/package.json",
        title: "package.json",
      },
      {
        id: "a25e7ab8-b402-416e-b7da-9c0f66342f92",
        path: "/package-lock.json",
        title: "package-lock.json",
      },
      {
        id: "5bf9c145-3d8a-4c31-853d-9eed9a25667a",
        path: "/.gitignore",
        title: ".gitignore",
      },
    ],
  },
];

const setFolders = (folders: Folder[]) => {
  localStorage.setItem("folders", JSON.stringify(folders));
};

const setExpandedFolderIds = (expandedFolderIds: string[]) => {
  localStorage.setItem("expandedFolderIds", JSON.stringify(expandedFolderIds));
};

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
  let rootFiles: Folder | undefined;

  for (const folder of folders) {
    if (folder.title.length === 0 && folder.path === "/") {
      folder.files = folder.files.sort(sortFunction);
      rootFiles = folder;
    } else {
      folder.path.substring(1).includes("/")
        ? subFolders.push(folder)
        : rootFolders.push(folder);
    }
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

  rootFiles && rootFolders.push(rootFiles);

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

const generateRandomId = (folders: Folder[]): string => {
  let uuid = crypto.randomUUID();
  let isExist = false;
  for (let { id, files } of folders) {
    if (id === uuid || files.findIndex(({ id }) => id === uuid) !== -1) {
      isExist = true;
      break;
    }
  }
  return isExist ? generateRandomId(folders) : uuid;
};

export const useFolder = defineStore("folder", {
  state: (): FolderState => {
    return {
      folders: [],
      expandedFolderIds: [],
      selectedId: null,
      renameId: null,
      actionType: null,
      renameActionType: null,
      title: "",
      renameTitle: "",
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
      if (!state.selectedId && !state.renameId) return [];
      let folder = state.folders.find(
        ({ id }) => id === (state.renameId || state.selectedId)
      );
      if (!folder) return [];
      let folderPath: string;
      folderPath = folder.path;
      if (state.renameId) {
        let keys = folder.path.split("/");
        keys.pop();
        folderPath = keys.join("/");
      }
      return state.folders
        .filter(
          ({ path }) =>
            path !== folderPath &&
            path !== folder!.path &&
            path.startsWith(folderPath) &&
            !path.substring(folderPath.length + 1).includes("/")
        )
        .map(({ title }) => title.toLocaleLowerCase());
    },
    existingFiles: (state): string[] => {
      let folder = state.folders.find(({ id, files }) =>
        state.actionType
          ? id === state.selectedId
          : files.findIndex((file) => file.id === state.renameId) !== -1
      );
      if (!folder) return [];
      return folder.files
        .map(({ id, title }) =>
          id === state.renameId ? "" : title.toLocaleLowerCase()
        )
        .filter(Boolean);
    },
  },
  actions: {
    createFolder() {
      let folder: Folder = {
        files: [],
        id: generateRandomId(this.folders),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      this.folders.push(folder);
      this.toggleAddIcon();
      setFolders(this.folders);
    },
    createFile() {
      let file: Files = {
        id: generateRandomId(this.folders),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      let index = this.folders.findIndex(({ id, path }) =>
        this.selectedId ? id === this.selectedId : path === "/"
      );
      if (index === -1) return;
      this.folders[index].files.push(file);
      this.toggleAddIcon();
      setFolders(this.folders);
    },
    renameFolder(folderId: string) {
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      for (let folder of this.folders) {
        if (folder.path.startsWith(selectedFolder.path)) {
          let path = selectedFolder.path.split("/");
          let title = this.renameTitle;
          path.splice(path.length - 1, 1, title);
          folder.path = path.join("/");
          folder.title = title;
          folder.files.forEach((file) => {
            let filePath = file.path.split("/");
            filePath.splice(filePath.length - 2, 1, title);
            file.path = filePath.join("/");
          });
        }
      }
      this.clearRename();
      setFolders(this.folders);
    },
    renameFile(folderId: string, fileId: string) {
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      let selectedFile = selectedFolder.files.find(({ id }) => id === fileId);
      if (!selectedFile) return;
      let keys = selectedFile.path.split("/");
      keys.pop();
      selectedFile.path = `${keys.join("/")}/${this.renameTitle}`;
      selectedFile.title = this.renameTitle;
      this.selectedId = selectedFile.id;
      this.clearRename();
      setFolders(this.folders);
    },
    deleteFolder(folderId: string) {
      let folder = this.folders.find(({ id }) => id === folderId);
      if (!folder) return;
      let folders = this.folders.filter(
        ({ path }) => !path.startsWith(folder!.path)
      );
      this.folders = folders;
      setFolders(this.folders);
    },
    deleteFile(folderId: string, fileId: string) {
      let index = this.folders.findIndex(({ id }) => id === folderId);
      if (index === -1) return;
      let files = this.folders[index].files;
      let fileIndex = files.findIndex(({ id }) => id === fileId);
      if (fileIndex === -1) return;
      files.splice(fileIndex, 1);
      setFolders(this.folders);
    },
    setSelectedId(id: string) {
      this.selectedId = id;
    },
    toggleAddIcon(actionType: ActionType = null) {
      this.actionType = actionType;
      if (!actionType) {
        this.title = "";
        this.error = null;
      } else {
        if (!this.selectedId) return;
        this.expandFolder(this.selectedId);
      }
    },
    toggleFolder(id: string) {
      let index = this.expandedFolderIds.indexOf(id);
      if (index === -1) {
        this.expandedFolderIds.push(id);
      } else {
        this.expandedFolderIds.splice(index, 1);
      }
      setExpandedFolderIds(this.expandedFolderIds);
    },
    expandFolder(id: string) {
      let isExist = this.expandedFolderIds.includes(id);
      if (!isExist) {
        this.expandedFolderIds.push(id);
        setExpandedFolderIds(this.expandedFolderIds);
      }
    },
    setDragSource(source: DragSource) {
      this.drag.source = source;
    },
    setDragDestination(destination: DragDestination) {
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
      setFolders(this.folders);
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
      this.folders =
        Array.isArray(folders) && folders.length > 0 ? folders : initialValue;
      setFolders(this.folders);
    },
    setExpandedFolderIds(folderIds: string[]) {
      this.expandedFolderIds = folderIds;
      setExpandedFolderIds(this.expandedFolderIds);
    },
    setRenameId(
      actionType: ActionType,
      folderId: string | null,
      fileId?: string | null
    ) {
      let renameId = folderId;
      let title: string;
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      title = selectedFolder.title;
      if (actionType === "file" && fileId) {
        let selectedFile = selectedFolder.files.find(({ id }) => id === fileId);
        if (!selectedFile) return;
        renameId = fileId;
        title = selectedFile.title;
      }
      this.renameTitle = title;
      this.renameActionType = actionType;
      this.renameId = renameId;
    },
    createFolderOrFile() {
      this.validateTitle();
      if (this.error !== null || this.actionType === null) return;
      if (this.actionType === "folder") {
        this.createFolder();
      } else {
        this.createFile();
      }
    },
    renameFolderOrFile(folderId: string, fileId?: string) {
      this.validateTitle();
      if (this.error !== null || this.renameActionType === null) return;
      if (this.renameActionType === "folder") {
        this.renameFolder(folderId);
      } else {
        if (!fileId) return;
        this.renameFile(folderId, fileId);
      }
    },
    validateTitle() {
      if (this.actionType === null && this.renameActionType === null) return;
      let error: string | null = null;
      let title = this.actionType ? this.title : this.renameTitle;
      if (title.length === 0) {
        error = `A ${
          this.actionType === "file" ? "File" : "Folder"
        } name must be provided`;
      } else {
        if (title === ".") {
          error = `The name <b>.</b> is not a valid as a file or folder name. So please choose different name.`;
        } else {
          let isExist =
            this.actionType === "file" || this.renameActionType === "file"
              ? this.existingFiles.includes(title.toLocaleLowerCase())
              : this.existingFolders.includes(title.toLocaleLowerCase());
          if (isExist) {
            error = `A ${
              this.actionType === "file" ? "File" : "Folder"
            } <b>${title}</b> already exists at this location. Please choose a different name`;
          } else {
            error = null;
          }
        }
      }
      this.error = error;
    },
    clearRename() {
      this.renameActionType = null;
      this.renameId = null;
      this.renameTitle = "";
    },
  },
});

// [{"id":"37375e14-e00f-4af0-9cb0-4caa5858a084","title":"src","path":"/src","files":[{"id":"c00e4996-486e-4e66-8466-148ac8a8aee2","title":"index.js","path":"/src/index.js"}]},{"id":"1723237d-4f5c-4417-bbdc-7ddf94dad885","title":"node_modules","path":"/node_modules","files":[]},{"id":"42e69ea4-de9f-4ce7-ab36-4223a343733f","title":"store","path":"/store","files":[]},{"id":"a10c3de4-387a-4a86-bc48-7ba5ed1d068a","title":"helper","path":"/helper","files":[]},{"id":"e2bc9c56-ba65-4ad7-bd52-1b3c2e50ed97","title":"components","path":"/components","files":[{"id":"7153eec6-c1c9-40ac-8044-5a1c6f217b9a","title":"index.js","path":"/components/index.js"}]},{"id":"de2ede25-03d6-4537-9f5b-784c0150111b","title":"types","path":"/types","files":[]},{"id":"7c7f8484-01cc-410a-84c9-02e69deda4a4","title":"public","path":"/public","files":[{"id":"21c1cfba-0938-44cb-b131-30d997a0da9b","title":"favicon.ico","path":"/public/favicon.ico"},{"id":"ecf20273-8f16-4032-8c2a-1f89a1c2b548","title":"index.html","path":"/public/index.html"}]},{"id":"81926f68-5600-478b-89a6-e5072345ce73","title":"assets","path":"/public/assets","files":[{"id":"d342f5cd-bdd4-4c55-98f6-67e7ab0e934c","title":"index.html","path":"/public/assets/index.html"},{"id":"f155be6e-f5a8-47d1-ba8f-c4cf00f470ed","title":"favicon.ico","path":"/public/assets/favicon.ico"}]},{"id":"c9c0319b-f1c5-4684-9366-ae4207fdd01b","title":"images","path":"/public/assets/images","files":[{"id":"bb987d93-173c-439f-b2bf-e421bbcc4e53","title":"index.html","path":"/public/assets/images/index.html"},{"id":"bc08fe7c-531c-4850-a060-fd8f61432a2c","title":"favicon.ico","path":"/public/assets/images/favicon.ico"}]},{"id":"914c508e-183e-4dc3-9bb8-aa800e5b0609","title":"js","path":"/public/assets/js","files":[{"id":"e1da43de-d613-4ab9-ac3b-bf557f2487c5","title":"index.html","path":"/public/assets/js/index.html"},{"id":"d9eb0ca9-f530-4f4a-aee7-3e597a052597","title":"favicon.ico","path":"/public/assets/js/favicon.ico"}]},{"id":"64f80e6d-7197-4a53-9513-874d92da3ac0","title":"html","path":"/public/html","files":[{"id":"220e6b20-6108-400f-90f4-afe0f52d21c0","title":"index.html","path":"/public/html/index.html"},{"id":"8943ea27-e4a9-4c08-b90c-caa0e34b420e","title":"favicon.ico","path":"/public/html/favicon.ico"}]},{"id":"f49fa34c-f140-4cd3-9e79-9b7ca5179d65","title":"Hello","path":"/src/Test/Demo/Hello","files":[{"id":"ee3dd6f8-773b-4f8a-a06a-bcda818a94b0","title":"style.scss","path":"/src/Test/Demo/Hello/style.scss"},{"id":"4c388ad4-f04b-42b1-b1c0-cd12fd01ea80","title":"hello.js","path":"/src/Test/Demo/Hello/hello.js"},{"id":"7d82608e-abb9-43e3-80cf-4a8e2fd685e3","title":"index.js","path":"/src/Test/Demo/Hello/index.js"}]},{"id":"c8c3c1e3-5f77-41c9-93d5-32d4b5e14a47","title":"World","path":"/src/World","files":[{"id":"80597528-ae24-47b0-9d44-598f28f2abc9","title":"hello.js","path":"/src/World/hello.js"},{"id":"5e7951ec-3ba6-45bc-a628-872b690df28c","title":"index.js","path":"/src/World/index.js"}]},{"id":"554b3e06-f6ad-4454-b35d-babb9c814a64","title":"Bye","path":"/src/Test/Demo/Hello/Bye","files":[{"id":"9eb3a068-781d-4177-bbc7-758e2687b9cc","title":"hello.js","path":"/src/Test/Demo/Hello/hello.js"},{"id":"7845f670-5c80-477d-bd9e-0559f0630f2b","title":"index.js","path":"/src/Test/Demo/Hello/index.js"}]},{"id":"a6f514b1-1a9a-4313-8c57-f31899c60041","title":"World","path":"/src/Test/Demo/World","files":[{"id":"c2d0a0ed-2a67-4aa2-b6e8-b8a592f7d060","title":"index.js","path":"/src/Test/Demo/HelloWorld/World"}]},{"id":"2c2e30aa-3a35-49a1-890a-7bc6b92a6504","title":"Demo","path":"/src/World/Demo","files":[{"id":"1764925e-99e3-4177-9180-7c49bfafe259","title":"hello.js","path":"/src/World/Demo/hello.js"},{"id":"ca64055d-d03d-444b-9b42-2a0370da9689","title":"index.js","path":"/src/World/Demo/index.js"}]},{"id":"ee61ac8a-fdda-45b6-a10a-8249a18fafb6","title":"Test","path":"/src/Test","files":[{"id":"6af668fa-524e-45b3-a7ff-d6750eb67f53","title":"test.js","path":"/src/Test/test.js"}]},{"id":"2695121d-3246-4b77-a4ce-824acc74bd01","title":"Demo","path":"/src/Test/Demo","files":[{"id":"f6736037-bc17-40fe-9345-60f7c6cb4599","title":"demo.js","path":"/src/Test/Demo/demo.js"},{"id":"4751f754-f35f-4d74-99f3-ca0a85910f15","title":"index.js","path":"/src/Test/Demo/index.js"}]},{"id":"393dc6ff-351f-407e-89dc-ead3f26f2b86","title":"utils","path":"/utils","files":[{"id":"b3d0448d-72b1-4b06-b775-08bd4f82878c","title":"index.js","path":"/utils/index.js"}]},{"id":"afff7395-8f41-4726-ae8e-fbc67aeb2d4a","title":"cookies","path":"/utils/cookies","files":[{"id":"3da59936-84b9-45af-bd49-878172481038","title":"index.js","path":"/utils/cookies/index.js"}]},{"id":"935c6105-0178-4fa3-8b7e-480e4acf4d11","title":"helper","path":"/src/Helper","files":[{"id":"e3258f0c-707b-4ec3-ae81-eae3607e7e0a","title":"util.js","path":"/src/helper/util.js"},{"id":"61f152f2-e00b-4b72-97d4-b37c05ad8431","title":"demo.js","path":"/src/helper/demo.js"},{"id":"03330b9c-0abb-4b79-be5d-0a2bdb1b8ed9","title":"service.js","path":"/src/helper/service.js"}]},{"files":[{"id":"36ee9918-6e05-4185-8d66-bf7ecdd5ac4f","title":"index.py","path":"/components/MultiSelect/index.py"},{"id":"bf964141-aa9d-4c00-b78c-fd70b019e415","title":"index.scss","path":"/components/MultiSelect/index.scss"},{"id":"4e21b9f1-e3e6-4f92-ac99-2623937c4eb9","title":"index.vue","path":"/components/MultiSelect/index.vue"}],"id":"826f9491-00f0-4553-ab53-0d1c174bb928","title":"MultiSelect","path":"/components/MultiSelects"},{"files":[{"id":"77078494-62ed-4456-be0e-ed09b1a481ec","title":"main.js","path":"/dist/main.js"}],"id":"9b170b3e-3588-4d09-be0c-1fa392652e89","title":"dist","path":"/dist"},{"files":[],"id":"2532043f-71ae-4a1c-ae04-bff3361b7946","title":"node_modulfas","path":"/node_modulfas"},{"files":[{"id":"89c917ae-9c7a-41ee-9952-8c9965421947","title":"index.js","path":"/components/Hello/index.js"}],"id":"f0763a01-b47d-4129-bcf8-ec1a7992c9e3","title":"Hello","path":"/components/Hello"},{"files":[],"id":"d8cc68b6-de8e-433f-be26-33fbaa6c8cd7","title":"sfa","path":"/components/MultiSelect/sfa"},{"files":[{"id":"e4b120ff-5136-4d1f-a5cb-44b4ce32892c","title":"index.ts","path":"/HelloWorld/index.ts"}],"id":"fc26a324-dbdd-4a57-9e5a-eda4c7d19fb5","title":"HelloWorld","path":"/HelloWorld"}]
