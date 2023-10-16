import os from "os";
import fs from "fs/promises";

const isWindows = os.platform() === "win32";

const readFile = async (file) => {
  try {
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const writeFile = async (file, data) => {
  try {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
};

const updateDependencies = async () => {
  try {
    const packageJson = await readFile("./package.json");

    if (isWindows) {
      /*
       * Se o sistema for Windows,
       * atualiza as dependências no package.json
       *
       * Remove a dependência Linux
       * Adiciona a dependência Windows
       */
      packageJson.dependencies["@esbuild/linux-x64"] = undefined;
      packageJson.dependencies["@esbuild/win32-x64"] = "0.18.20";
    } else {
      /*
       * Se o sistema não for Windows,
       * usa as dependências padrões do package.json
       *
       * Remove a dependência Windows
       * Adiciona a dependência Linux
       */
      packageJson.dependencies["@esbuild/win32-x64"] = undefined;
      packageJson.dependencies["@esbuild/linux-x64"] = "0.15.18";
    }

    await writeFile("./package.json", packageJson);
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar as dependências:", error);
  }
};

updateDependencies();
