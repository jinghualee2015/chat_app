import { useRoutes } from 'react-router-dom';
import {
    SettingOutlined,
    BulbOutlined,
    SyncOutlined,
    FileSyncOutlined,
    UserOutlined,
    FormOutlined,
    InfoCircleOutlined,
    CodeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import Settings from '@/views/settings';
import About from '@/views/about';
import Scripts from '@/views/scripts';
import ScriptsEditor from '@/views/scripts/Editor';
import Notes from '@/views/notes';
import Markdown from '@/views/markdown';
import Dashboard from './views/dashboard';

export type ChatRouteMetaObject = {
    label: string;
    icon?: React.ReactNode;
};

type ChatRouteObject = {
    path: string;
    element?: JSX.Element;
    hideMenu?: boolean;
    meta?: ChatRouteMetaObject;
    children?: ChatRouteObject[];
};

export const routes: Array<ChatRouteObject> = [
    {
        path: '/settings',
        element: <Settings />,
        meta: {
            label: 'Settings',
            icon: <SettingOutlined />,
        },
    },
    {
        path: '/notes',
        element: <Notes />,
        meta: {
            label: 'Notes',
            icon: <FormOutlined />,
        },
    },
    {
        path: '/md/:id',
        element: <Markdown />,
        hideMenu: true,
    },
    {
        path: '/scripts',
        element: <Scripts />,
        meta: {
            label: 'Scripts',
            icon: <CodeOutlined />,
        },
    },
    {
        path: '/scripts/:id',
        element: <ScriptsEditor />,
        hideMenu: true,
    },
    {
        path: '/about',
        element: <About />,
        meta: {
            label: 'About',
            icon: <InfoCircleOutlined />,
        },
    },
    {
        path: '/',
        element: <Settings />,
    },
];

type MenuItem = Required<MenuProps>['items'][number];
export const menuItems: MenuItem[] = routes
    .filter((j) => !j.hideMenu)
    .map((i) => ({
        ...i.meta,
        key: i.path || '',
        children: i?.children
            ?.filter((j) => !j.hideMenu)
            ?.map((j) => ({ ...j.meta, key: `${i.path}/${j.path}` || '' })),
    }));

export default () => {
    return useRoutes(routes);
};