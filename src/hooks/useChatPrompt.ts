import { useState, useEffect } from 'react';
import { clone } from 'lodash';
import { invoke } from '@tauri-apps/api';

import { CHAT_PROMPT_JSON, CHAT_PROMPT_CMD_JSON, readJSON, writeJSON } from '@/utils';
import useInit from '@/hooks/useInit';

export default function useChatPrompt(key: string, file = CHAT_PROMPT_CMD_JSON) {
    const [promptJson, setPromptJson] = useState<Record<string, any>>({});

    useInit(async () => {
        const data = await readJSON(file, {
            defaultVals: { name: 'ChatApp Prompts', [key]: null },
        });
        setPromptJson(data);
    });

    const promptSet = async (data: Record<string, any>[] | Record<string, any>) => {
        const oData = clone(promptJson);
        oData[key] = data;

        await writeJSON(file, oData);
        setPromptJson(oData);
    };

    const promptUpdate = async (id: string, field: string, value: any) => {
        const oData = clone(promptJson);

        const idx = oData[key].findIndex((v: any) => v.id === id);
        oData[key][idx][field] = value;

        await writeJSON(file, oData);
        setPromptJson(oData);
    }

    return { promptJson, promptSet, promptUpdate, promptData: promptJson?.[key] || [] };
}