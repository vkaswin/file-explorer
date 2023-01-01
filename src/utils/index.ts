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
  | "ico"
  | "gitignore"
  | "md"
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
  "md",
  "gitignore",
  "ico",
];

export const getFileIcon = (fileName: string) => {
  if (!fileName.includes(".")) return require("@/assets/file-icons/file.svg");

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

    case "tsx":
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

    case "ico":
      icon = "favicon";
      break;

    case "md":
      icon = "readme";
      break;

    case "gitignore":
      icon = "git";
      break;

    default:
      icon = "file";
      break;
  }

  return require(`@/assets/file-icons/${icon}.svg`);
};

export const getScrollParent = (element: HTMLElement | null) => {
  var style = getComputedStyle(element!);
  var excludeStaticParent = style.position === "absolute";
  var regex = /(auto|scroll)/;

  //   if (style.position === "fixed") return document.body;

  for (var parent = element; (parent = parent!.parentElement); ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") continue;

    if (regex.test(style.overflow + style.overflowY + style.overflowX))
      return parent;
  }

  return document.body;
};
