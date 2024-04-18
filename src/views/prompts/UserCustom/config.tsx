import { Tag, Switch, Space, Popconfirm, Table } from "antd";
import { render } from "react-dom";

export const promptColumns = () => [
    {
        title: '/{cmd}',
        dataIndex: 'cmd',
        fixed: 'left',
        width: 120,
        key: 'cmd',
        render: (v: string) => <Tag color="#2a2a2a">/{v}</Tag>,
    },
    {
        title: 'Act',
        dataIndex: 'act',
        width: 200,
        key: 'act',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        width: 150,
        key: 'tags',
        render: (v: string[]) => (
            <span className="chat-prompt-tags">
                {v?.map((i) => (
                    <Tag key={i}>{i}</Tag>
                ))}
            </span>
        ),
    },
    {
        title: 'Enable',
        dataIndex: 'enable',
        width: 80,
        key: 'enable',
        render: (v: boolean = false, row: Record<string, any>, action: Record<string, any>) => (
            <Switch checked={v} onChange={(v) => action.setRecord({ ...row, enable: v }, 'enable')} />
        ),
    },
    Table.EXPAND_COLUMN,
    {
        title: 'Prompt',
        dataIndex: 'prompt',
        key: 'prompt',
        width: 300,
        render: (v: string) => <span className="chat-prompts-val">{v}</span>,
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: (_: any, row: any, actions: any) => (
            <Space size="middle">
                <a onClick={() => actions.setRecord(row, 'edit')}>Edit</a>
                <Popconfirm
                    title="Are you sure to delete this prompt?"
                    onConfirm={() => actions.setRecord(row, 'delete')}
                    okText="Yes"
                    cancelText="No"
                >
                    <a>Delete</a>
                </Popconfirm>
            </Space>
        ),
    }
];