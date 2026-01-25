import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GripHorizontal } from 'lucide-react';

export default function ImageResizeComponent(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth || 0;

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const diffX = currentX - startX;
      const newWidth = Math.max(100, startWidth + diffX); // Minimum 100px
      
      updateAttributes({ width: newWidth });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [updateAttributes]);

  return (
    <NodeViewWrapper 
      ref={containerRef}
      className="image-resizer relative inline-block group"
      style={{ 
        width: node.attrs.width || 'auto',
        maxWidth: '100%',
        display: 'inline-block',
        position: 'relative',
        lineHeight: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={node.attrs.src} 
        alt={node.attrs.alt} 
        className={`rounded-sm transition-shadow duration-200 ${selected ? 'ring-2 ring-[#144793] ring-offset-1' : ''}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      
      {(selected || isResizing) && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute bottom-2 right-2 p-1 bg-white/90 rounded shadow border border-gray-200 cursor-ew-resize hover:bg-white transition-colors"
          title="Resmi boyutlandırmak için sürükleyin"
        >
          <GripHorizontal size={16} className="text-gray-600" />
        </div>
      )}
    </NodeViewWrapper>
  );
}
