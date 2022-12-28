type Extension =
  | "js"
  | "ts"
  | "git"
  | "vue"
  | "tsx"
  | "jsx"
  | "pdf"
  | "kt"
  | "dart"
  | "go"
  | "json"
  | "php"
  | "zip"
  | "py"
  | "rb"
  | "html"
  | "scss"
  | "c"
  | "cpp"
  | "css"
  | "swift"
  | "astro"
  | "scala"
  | "dockerfile"
  | "svelte"
  | "prisma"
  | "elixir";

export const extensions = [
  "js",
  "ts",
  "git",
  "vue",
  "tsx",
  "jsx",
  "pdf",
  "kt",
  "dart",
  "go",
  "json",
  "php",
  "zip",
  "py",
  "rb",
  "html",
  "scss",
  "c",
  "cpp",
  "css",
  "swift",
  "astro",
  "scala",
  "dockerfile",
  "svelte",
  "prisma",
  "elixir",
];

export const getFileIcon = (fileName: string) => {
  let keys = fileName.split(".");
  let extension = keys[keys.length - 1].toLocaleLowerCase();
  let icon: string;
  switch (extension as Extension) {
    case "js":
      icon = "javascript";
      break;

    case "ts":
      icon = "typescript";
      break;

    case "git":
      icon = "git";
      break;

    case "jsx":
      icon = "react";
      break;

    case "vue":
      icon = "vue";
      break;

    case "pdf":
      icon = "pdf";
      break;

    case "kt":
      icon = "kotlin";
      break;

    case "dart":
      icon = "dart";
      break;

    case "go":
      icon = "go";
      break;

    case "json":
      icon = "json";
      break;

    case "php":
      icon = "php";
      break;

    case "zip":
      icon = "zip";
      break;

    case "py":
      icon = "python";
      break;

    case "rb":
      icon = "ruby";

    case "html":
      icon = "html";
      break;

    case "scss":
      icon = "sass";
      break;

    case "c":
      icon = "c";
      break;

    case "cpp":
      icon = "cpp";
      break;

    case "css":
      icon = "css";
      break;

    case "swift":
      icon = "swift";
      break;

    case "astro":
      icon = "astro";
      break;

    case "dockerfile":
      icon = "docker";
      break;

    case "scala":
      icon = "scala";
      break;

    case "svelte":
      icon = "svelte";
      break;

    case "prisma":
      icon = "prisma";
      break;

    case "elixir":
      icon = "elixir";
      break;

    default:
      icon = "file";
      break;
  }

  return require(`@/assets/file-icons/${icon}.svg`);
};
