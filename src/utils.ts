import { readTextFile, writeTextFile, exists, createDir } from '@tauri-apps/api/fs';
import { homeDir, join, dirname } from '@tauri-apps/api/path';
import dayjs from 'dayjs';

export const APP_CONF_JSON = 'chat.conf.json';
export const CHAT_PROMPT_JSON = 'chat.prompt.json';
export const CHAT_PROMPT_CMD_JSON = 'chat.prompt.cmd.json';
export const CHAT_DOWNLOAD_JSON = 'chat.download.json';
export const CHAT_AWSSOME_JSON = 'chat.awesome.json';
export const CHAT_NOTES_JSON = 'chat.notes.json';
export const CHAT_PROMPTS_CSV = 'chat.prompts.csv';
export const GITHUB_PROMPTS_CSV_URL = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';
export const GITHUB_LOG_URL = 'https://raw.githubusercontent.com/jinghualee2015/chat_app/main/UPDATE_LOG.md';