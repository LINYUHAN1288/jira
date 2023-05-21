/**
 * @file task-modal
 * @author linyuhan
 */

import React, { useEffect, useCallback } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useUrlQueryParam } from 'utils/url';
import { useTask, useTasksQueryKey, useDeleteTask } from 'utils/task';
import { useEditTask } from 'utils/task';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

export const useTaskModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);

    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

    const startEdit = useCallback(
        (id: number) => {
            setEditingTaskId({ editingTaskId: id });
        },
        [setEditingTaskId]
    );

    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: '' });
    }, [setEditingTaskId]);

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    };
};

export const TaskModal = () => {
    const [form] = Form.useForm();
    const { editingTaskId, editingTask, close } = useTaskModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());
    const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

    const onCancel = () => {
        close();
        form.resetFields();
    };

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };

    const startDelete = () => {
        close();
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务',
            onOk() {
                return deleteTask({ id: Number(editingTaskId) });
            }
        });
    };

    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    return (
        <Modal
            forceRender={true}
            onCancel={onCancel}
            onOk={onOk}
            okText={'确认'}
            cancelText={'取消'}
            confirmLoading={editLoading}
        >
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
                    <Input />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={startDelete} size={'small'} style={{ fontSize: '14px' }}>
                    删除
                </Button>
            </div>
        </Modal>
    );
};
