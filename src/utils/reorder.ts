/**
 * @file reorder.ts
 * @author linyuhan
 * @description 重新排序
 */

interface ReorderParams {
    fromId: number;
    type: 'before' | 'after';
    referenceId: number;
    list: { id: number }[];
}

export const reorder = ({ fromId, type, referenceId, list }: ReorderParams) => {
    const copiedList = [...list];
    const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);

    if (!referenceId) {
        return insert([...copiedList], movingItemIndex, copiedList.length - 1, 'after');
    }

    const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
    return insert([...copiedList], movingItemIndex, targetIndex, type);
};

const insert = (list: unknown[], from: number, to: number, type: 'before' | 'after') => {
    const toItem = list[to];
    const removeItem = list.splice(from, 1)[0];
    const toIndex = list.indexOf(toItem);
    type === 'after' ? list.splice(toIndex + 1, 0, removeItem) : list.splice(toIndex, 0, removeItem);
    return list;
};
