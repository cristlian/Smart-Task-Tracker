import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../store/useStore';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { STRINGS } from '../../i18n/strings.zh-CN';

function SortableItem({ id, visible, onToggle }: { id: string, visible: boolean, onToggle: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const getLabel = (id: string) => {
        switch (id) {
            case 'timer': return STRINGS.modules.timer;
            case 'task-list': return STRINGS.modules.taskList;
            case 'current-task': return STRINGS.modules.currentTask;
            default: return id;
        }
    };

    return (
        <div ref={setNodeRef} style={style} className={cn("flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 touch-none", isDragging && "shadow-lg bg-white")}>
            <div className="flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400">
                    <GripVertical size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">{getLabel(id)}</span>
            </div>
            <button onClick={onToggle} className={cn("p-2 rounded-full transition-colors", visible ? "text-indigo-600 bg-indigo-50" : "text-gray-400 bg-gray-200")}>
                {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
        </div>
    );
}

export const ModuleSettings: React.FC = () => {
    const { settings, updateModuleConfig } = useStore();
    const modules = [...settings.modules].sort((a, b) => a.order - b.order);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = modules.findIndex(m => m.id === active.id);
            const newIndex = modules.findIndex(m => m.id === over.id);
            const newModules = arrayMove(modules, oldIndex, newIndex).map((m, i) => ({ ...m, order: i }));
            updateModuleConfig(newModules);
        }
    };

    const toggleVisibility = (id: string) => {
        const newModules = modules.map(m => m.id === id ? { ...m, visible: !m.visible } : m);
        updateModuleConfig(newModules);
    };

    return (
        <div className="w-full">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
                    {modules.map(module => (
                        <SortableItem 
                            key={module.id} 
                            id={module.id} 
                            visible={module.visible} 
                            onToggle={() => toggleVisibility(module.id)} 
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};
