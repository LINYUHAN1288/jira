/**
 * @file flow 画布组件
 * @author linyuhan
 */

import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toolbar, Box, AppBar, Button } from '@mui/material';
import { flowContext } from 'store/context/react-flow-context';

// ==============================|| CANVAS ||============================== //
const canvas = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { reactFlowInstance, setReactFlowInstance } = useContext(flowContext);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [selectedNode, setSelectedNode] = useState(null);

    const reactFlowWrapper = useRef(null);

    const onConnect = (params: Connection) => {
        const newEdge = {
            ...params
        };

        const targetNodeId = params.targetHandle?.split('-')[0];
        const sourceNodeId = params.sourceHandle?.split('-')[0];
        const targetInput = params.targetHandle?.split('-')[2] || '';

        setNodes(nds =>
            nds.map(node => {
                if (node.id === targetNodeId) {
                    const inputAnchor = node.data.inputAnchors.find(ancr => ancr.name === targetInput);
                    const inputParam = node.data.inputParams.find(param => param.name === targetInput);

                    if (inputAnchor?.list) {
                        const newValues = node.data.inputs[targetInput] || [];
                        if (targetInput === 'tools') {
                        } else {
                        }
                    }
                }
                return node;
            })
        );

        setEdges(eds => addEdge(newEdge, eds));
    };

    const handleLoadFlow = (file: string) => {
        try {
            const flowData = JSON.parse(file);
            const nodes = flowData.nodes || [];

            setNodes(nodes);
            setEdges(flowData.edges || []);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteFlow = async () => {};

    // const handleSaveFlow = (chatflowName: string) => {
    //     if (reactFlowInstance)
    // };

    const onNodeClick = useCallback((event, clickedNode) => {
        setSelectedNode(clickedNode);
        setNodes(nds =>
            nds.map(node => {
                if (node.id === clickedNode.id) {
                    node.data = {
                        ...node.data,
                        selected: true
                    };
                } else {
                    node.data = {
                        ...node.data,
                        selected: false
                    };
                }
                return node;
            })
        );
    }, []);

    return (
        <>
            <Box>
                <AppBar enableColorOnDark position="fixed" color="inherit" elevation={1}>
                    <Toolbar></Toolbar>
                </AppBar>
                <Box>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                    >
                        <Controls />
                    </ReactFlow>
                </Box>
            </Box>
        </>
    );
};
