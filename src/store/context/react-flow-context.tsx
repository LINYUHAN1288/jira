/**
 * @file react-flow-context 画布状态管理
 * @author linyuhan
 */

import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { getUniqueNodeId } from 'utils/node-helper';

const initialValue = {
    reactFlowInstance: null,
    setReactFlowInstance: () => {},
    duplicateNode: () => {},
    deleteNode: () => {},
    deleteEdge: () => {}
};

export const flowContext = createContext(initialValue);

export const ReactFlowContext = ({ children }) => {
    const dispatch = useDispatch();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const deleteNode = (nodeId: string) => {
        reactFlowInstance?.setNodes(reactFlowInstance.getNodes().filter(node => nodeId !== node.id));
        reactFlowInstance?.setEdges(
            reactFlowInstance.getEdges().filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId)
        );
        // dispatch({ type: SET_DIRTY });
    };

    const duplicateNode = (nodeId: string) => {
        const nodes = reactFlowInstance?.getNodes();
        const originalNode = nodes.find(node => node.id === nodeId);
        if (originalNode) {
            const newNodeId = getUniqueNodeId(originalNode.data, nodes);
            const cloneNode = cloneDeep(originalNode);
            const duplicateNode = {
                ...cloneNode,
                id: newNodeId,
                position: {
                    x: cloneNode.position.x + 400,
                    y: cloneNode.position.y
                },
                positionAbsolute: {
                    x: cloneNode.positionAbsolute.x + 400,
                    y: cloneNode.positionAbsolute.y
                },
                data: {
                    ...cloneNode.data,
                    id: newNodeId
                },
                selected: false
            };

            const dataKeys = ['inputParams', 'inputAnchors', 'outputAnchors'];

            for (const key of dataKeys) {
                for (const item of duplicateNode.data[key]) {
                    if (item.id) {
                        item.id = item.id.replace(nodeId, newNodeId);
                    }
                }
            }

            reactFlowInstance?.setNodes([...nodes, duplicateNode]);
            // dispatch({ ty})
        }
    };

    return (
        <flowContext.Provider
            value={{
                reactFlowInstance,
                setReactFlowInstance,
                deleteNode,
                duplicateNode
            }}
        >
            {children}
        </flowContext.Provider>
    );
};
