/**
 * @flie node-helper 节点工具函数集合
 * @author linyuhan
 */

export const getUniqueNodeId = (nodeData, nodes) => {
    let totalSameNodes = 0;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.data.name === nodeData.name) {
            totalSameNodes++;
        }
    }
    let nodeId = `${nodeData.name}_${totalSameNodes}`;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === nodeId) {
            nodeId = `${nodeData.name}_${totalSameNodes++}`;
        }
    }
    return nodeId;
};