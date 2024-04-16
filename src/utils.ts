import { readTextFile, writeTextFile, exists, createDir } from '@tauri-apps/api/fs';
import { homeDir, join, dirname } from '@tauri-apps/api/path';
import { dir } from 'console';
import dayjs from 'dayjs';
import { link } from 'fs';

export const APP_CONF_JSON = 'chat.conf.json';
export const CHAT_PROMPT_JSON = 'chat.prompt.json';
export const CHAT_PROMPT_CMD_JSON = 'chat.prompt.cmd.json';
export const CHAT_DOWNLOAD_JSON = 'chat.download.json';
export const CHAT_AWSOME_JSON = 'chat.awesome.json';
export const CHAT_NOTES_JSON = 'chat.notes.json';
export const CHAT_PROMPTS_CSV = 'chat.prompts.csv';
export const GITHUB_PROMPTS_CSV_URL = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';
export const GITHUB_LOG_URL = 'https://raw.githubusercontent.com/jinghualee2015/chat_app/main/UPDATE_LOG.md';

export const DISABLE_AUTO_COMPLETE = {
    autoCapitalize: 'off',
    autoComplete: 'off',
    spellCheck: false,
};

export const chatRoot = async () => {
    return join(await homeDir(), '.chat_app');
}

export const scriptRoot = async () => {
    return join(await chatRoot(), 'scripts');
}

export const chatPromptPath = async () => {
    return join(await chatRoot(), CHAT_PROMPT_JSON);
}

export const chatPromptsPath = async () => {
    return join(await chatRoot(), CHAT_PROMPTS_CSV);
}

type readJSONpts = {
    defaultVals?: Record<string, any>;
    isRoot?: boolean;
    isList?: boolean;
};

export const readJSON = async (path: string, opts: readJSONpts = {}) => {
    const { defaultVals = {}, isRoot = false, isList = false } = opts;
    const root = await chatRoot();

    let file = path;

    if (!isRoot) {
        file = await join(root, path);
    }

    if (!(await exists(file))) {
        if ((await dirname(file)) != root) {
            await createDir(await dirname(file), { recursive: true });
        }
        await writeTextFile(
            file,
            isList ? '[]'
                : JSON.stringify(
                    {
                        name: "ChatApp",
                        link: "https://github.com/jinghualee2015/chat_app",
                        ...defaultVals,
                    },
                    null,
                    2,
                ),
        )
    }

    try {
        return JSON.parse(await readTextFile(file));
    } catch (e) {
        return {};
    }

};

type writeJSONOpts = {
    dir?: string
    isRoot?: boolean
};

export const writeJSON = async (
    path: string,
    data: Record<string, any>,
    opts: writeJSONOpts = {},
) => {
    const { isRoot = false } = opts
    const root = await chatRoot();
    let file = path;

    if (!isRoot) {
        file = await join(root, path);
    }
    if (isRoot && !(await exists(await dirname(file)))) {
        await createDir(await dirname(file), { recursive: true });
    }

    await writeTextFile(file, JSON.stringify(data, null, 2));
};

export const fmtDate = (date: any) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");
export const genCmd = (act: string) =>
    act
        .replace(/\s+|\/+/g, '_')
        .replace(/[^\d\w]/g, '')
        .toLocaleLowerCase();