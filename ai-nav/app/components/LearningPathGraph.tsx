'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Edge, 
  MiniMap, 
  NodeTypes, 
  Panel,
  useEdgesState, 
  useNodesState,
  Node as FlowNode,
  MarkerType,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PRIMARY_CATEGORIES } from '../data/tutorials';

// 节点类型定义
interface CustomNodeData {
  label: string;
  description: string;
  category?: string;
}

// 节点位置映射类型
interface PositionMap {
  [key: string]: { x: number; y: number };
}

// 自定义节点组件
function CustomNode({ data, selected }: { data: CustomNodeData, selected: boolean }) {
  const nodeStyle = {
    background: data.label === 'Foundations' ? '#EFF6FF' : 
                data.label === 'Machine Learning' ? '#FFFBEB' : 
                data.label === 'Deep Learning' ? '#F5F3FF' :
                data.label === 'Natural Language Processing' ? '#ECFDF5' :
                data.label === 'Computer Vision' ? '#EEF2FF' :
                data.label === 'Reinforcement Learning' ? '#FEF2F2' :
                data.label === 'Generative AI' ? '#FDF2F8' : 
                data.label === 'Tools & Platforms' ? '#F8FAFC' : '#FFFFFF',
    border: `2px solid ${selected ? '#3B82F6' : 
              data.label === 'Foundations' ? '#BFDBFE' : 
              data.label === 'Machine Learning' ? '#FDE68A' : 
              data.label === 'Deep Learning' ? '#DDD6FE' :
              data.label === 'Natural Language Processing' ? '#A7F3D0' :
              data.label === 'Computer Vision' ? '#C7D2FE' :
              data.label === 'Reinforcement Learning' ? '#FECACA' :
              data.label === 'Generative AI' ? '#FBCFE8' : 
              data.label === 'Tools & Platforms' ? '#E2E8F0' : '#E2E8F0'}`,
    color: data.label === 'Foundations' ? '#1E40AF' : 
          data.label === 'Machine Learning' ? '#92400E' : 
          data.label === 'Deep Learning' ? '#5B21B6' :
          data.label === 'Natural Language Processing' ? '#065F46' :
          data.label === 'Computer Vision' ? '#3730A3' :
          data.label === 'Reinforcement Learning' ? '#991B1B' :
          data.label === 'Generative AI' ? '#9D174D' : 
          data.label === 'Tools & Platforms' ? '#334155' : '#334155',
    transition: 'all 0.2s ease',
    boxShadow: selected ? '0 0 0 4px rgba(59, 130, 246, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.08)',
    transform: selected ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <div
      className={`px-5 py-4 rounded-lg shadow-md max-w-[220px] hover:shadow-lg cursor-pointer flex flex-col items-center transition-all ${selected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
      style={nodeStyle as React.CSSProperties}
    >
      <div className="font-semibold text-center mb-1">{data.label}</div>
      <div className="text-xs text-center opacity-90">{data.description}</div>
      
      {/* 更明显的交互提示 */}
      {selected ? (
        <div className="mt-2 bg-blue-100 text-blue-700 rounded-full text-xs px-3 py-1 flex items-center font-medium animate-pulse-slow">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          </svg>
          Click to view related tutorials
        </div>
      ) : data.category ? (
        <div className="mt-2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to view
        </div>
      ) : null}
    </div>
  );
}

// 学习路径图的数据结构
interface GraphData {
  id: string;
  label: string;
  children?: any[];
  [key: string]: any;
}

interface LearningPathGraphProps {
  data: GraphData;
}

export default function LearningPathGraph({ data }: LearningPathGraphProps) {
  // 定义节点类型
  const nodeTypes: NodeTypes = {
    custom: CustomNode,
  };

  // 状态管理
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const dottedEdgeAddedRef = useRef(false); // 使用ref来跟踪是否已添加虚线连接
  
  // 处理节点点击
  const onNodeClick = useCallback((event: React.MouseEvent, node: FlowNode) => {
    setSelectedNode(node.id);
    
    // 如果节点有类别，则重定向到相应的教程页面
    const category = node.data?.category;
    if (category) {
      // 延迟跳转，以便用户看到选中状态的视觉反馈
      setTimeout(() => {
        window.location.href = `/tutorials?category=${category}`;
      }, 300);
    }
  }, []);

  // 处理画布点击（取消节点选择）
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // 将数据转换为节点和边
  useEffect(() => {
    if (!data) return;

    // 创建更精确的布局，使用固定坐标 - 减少左侧节点间距，保持右侧节点均匀分布
    const layoutMap: PositionMap = {
      'root': { x: 40, y: 220 }, // 将起点框向下平移
      'foundations': { x: 300, y: 220 },
      'machine-learning': { x: 530, y: 220 },
      'deep-learning': { x: 760, y: 220 },
      'nlp': { x: 1000, y: 0 },
      'computer-vision': { x: 1000, y: 160 }, // 将Computer Vision框向上平移
      'reinforcement-learning': { x: 1000, y: 300 },
      'generative-ai': { x: 1000, y: 450 },
      'tools-platforms': { x: 40, y: 350 },
    };

    const flowNodes: FlowNode[] = [];
    const flowEdges: Edge[] = [];
    
    // 设置根节点
    const rootNode: FlowNode = {
      id: data.id,
      type: 'custom',
      position: layoutMap['root'],
      data: { 
        label: data.label,
        description: 'Learning Path Starting Point',
      },
      style: { width: 220 }, // 增大节点尺寸
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
    
    // 对所有连接线使用更加鲜明的颜色和更粗的线条
    const baseEdgeStyle = {
      stroke: '#334155', // 使用更深的颜色
      strokeWidth: 3.5,  // 更粗的线条
    };

    const baseArrowSettings = {
      type: MarkerType.ArrowClosed,
      width: 22,
      height: 22,
      color: '#334155', // 使用更深的颜色
    };
    
    // 创建节点和边的递归函数
    const createNodesAndEdges = (node: GraphData, parentId?: string): void => {
      if (!node) return;
      
      const id = node.id;
      
      // 检查是否是主路径或特定节点
      if (layoutMap[id]) {
        // 创建节点
        const flowNode: FlowNode = {
          id,
          type: 'custom',
          position: layoutMap[id],
          data: { 
            label: node.label,
            description: node.description || '',
            category: node.category,
          },
          style: { width: 220 }, // 增大节点尺寸
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        };
        
        // 为不同的节点设置不同的连接点位置
        if (id === 'tools-platforms') {
          flowNode.sourcePosition = Position.Top;
          flowNode.targetPosition = Position.Top;
        } else if (id.includes('nlp') || id.includes('computer-vision') || id.includes('reinforcement-learning') || id.includes('generative-ai')) {
          flowNode.targetPosition = Position.Left;
        } else if (id === 'deep-learning') {
          flowNode.sourcePosition = Position.Right;
          flowNode.targetPosition = Position.Left;
        } else {
          flowNode.sourcePosition = Position.Right;
          flowNode.targetPosition = Position.Left;
        }
        
        flowNodes.push(flowNode);
        
        // 如果有父节点，创建连接边
        if (parentId) {
          let edgeType: 'default' | 'straight' | 'step' | 'smoothstep' | 'bezier' = 'straight';
          
          // 对于从deep-learning到右侧分支的节点，使用弯曲的连接线
          if (parentId === 'deep-learning' && 
              (id === 'nlp' || id === 'computer-vision' || id === 'reinforcement-learning' || id === 'generative-ai')) {
            edgeType = 'smoothstep';
          }
          
          const flowEdge: Edge = {
            id: `e${parentId}-${id}`,
            source: parentId,
            target: id,
            type: edgeType,
            zIndex: 100,  // 确保边在最上层
            animated: selectedNode === parentId || selectedNode === id,
            markerEnd: {
              ...baseArrowSettings,
            },
            style: {
              ...baseEdgeStyle,
              zIndex: 1000, // 更高的z-index确保线条在最上层
            },
          };
          
          flowEdges.push(flowEdge);
        }
        
        // 处理子节点
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            createNodesAndEdges(child, id);
          });
        }
      }
    };
    
    // 创建根节点
    flowNodes.push(rootNode);
    
    // 处理所有节点和边
    if (data.children && data.children.length > 0) {
      data.children.forEach((child) => {
        createNodesAndEdges(child, data.id);
      });
    }
    
    // 更新 React Flow 状态
    setNodes(flowNodes);
    setEdges(flowEdges);
    dottedEdgeAddedRef.current = false; // 重置虚线连接状态
  }, [data, setNodes, setEdges]);
  
  // 添加工具与平台与基础节点的虚线连接
  useEffect(() => {
    // 确保节点已加载且虚线尚未添加
    if (nodes.length > 0 && !dottedEdgeAddedRef.current) {
      // 查找基础和工具平台节点
      const foundationsNode = nodes.find(node => node.id === 'foundations');
      const toolsNode = nodes.find(node => node.id === 'tools-platforms');
      
      if (foundationsNode && toolsNode) {
        const dottedEdge: Edge = {
          id: 'e-foundations-tools',
          source: 'foundations',
          target: 'tools-platforms',
          type: 'step',
          zIndex: 100,  // 确保边在最上层
          style: { 
            stroke: '#334155', // 使用更深的颜色
            strokeWidth: 3, 
            strokeDasharray: '6 6',
            zIndex: 1000, // 更高的z-index确保线条在最上层 
          },
          markerEnd: {
            type: MarkerType.Arrow,
            width: 22, // 更大的箭头
            height: 22, // 更大的箭头
            color: '#334155', // 使用更深的颜色
          },
        };
        
        setEdges(prevEdges => [...prevEdges, dottedEdge]);
        dottedEdgeAddedRef.current = true; // 标记虚线已添加
      }
    }
  }, [nodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '550px', position: 'relative' }} className="react-flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }} // 调整默认缩放以便看到整个图
        attributionPosition="bottom-left"
        onInit={setReactFlowInstance as any}
        defaultEdgeOptions={{
          type: 'straight',
          style: { 
            stroke: '#334155', // 使用更深的颜色
            strokeWidth: 3.5,  // 更粗的线条
            zIndex: 1000,      // 确保在最上层显示
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#334155', // 使用更深的颜色
            width: 22, // 更大的箭头
            height: 22, // 更大的箭头
          },
          zIndex: 100, // 确保边在最上层
        }}
        elementsSelectable={true}
        edgesFocusable={true}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#f8fafc" gap={16} />
        <Controls showInteractive={false} />
        <MiniMap 
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            return node.data.label === 'Foundations' ? '#BFDBFE' : 
                  node.data.label === 'Machine Learning' ? '#FDE68A' : 
                  node.data.label === 'Deep Learning' ? '#DDD6FE' :
                  node.data.label === 'Natural Language Processing' ? '#A7F3D0' :
                  node.data.label === 'Computer Vision' ? '#C7D2FE' :
                  node.data.label === 'Reinforcement Learning' ? '#FECACA' :
                  node.data.label === 'Generative AI' ? '#FBCFE8' : 
                  node.data.label === 'Tools & Platforms' ? '#E2E8F0' : '#E2E8F0';
          }}
          style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
          nodeBorderRadius={4}
        />
        <Panel position="top-right">
          <div className="bg-white p-2 rounded shadow-sm text-xs text-slate-600 border border-slate-100">
            <div className="flex items-center mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="ml-1 font-medium">Operation Tips:</span>
            </div>
            <ul className="space-y-1 pl-5 list-disc">
              <li>Click on nodes to view related tutorials</li>
              <li>Scroll to zoom, drag to move</li>
              <li>Use the minimap in the bottom right for quick navigation</li>
            </ul>
        </div>
        </Panel>
      </ReactFlow>
    </div>
  );
} 