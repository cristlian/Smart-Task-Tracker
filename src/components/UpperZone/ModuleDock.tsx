import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../store/useStore';
import { TimerModule } from './TimerModule';
import { TaskListModule } from './TaskListModule';
import { CurrentTaskModule } from './CurrentTaskModule';

const COMPONENTS: Record<string, React.FC> = {
    'timer': TimerModule,
    'task-list': TaskListModule,
    'current-task': CurrentTaskModule,
};

function SortableItem({ id, children }: { id: string, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4 touch-none">
            {children}
        </div>
    );
}

export const ModuleDock: React.FC = () => {
    const { settings, updateModuleConfig } = useStore();
    const visibleModules = settings.modules.filter(m => m.visible).sort((a, b) => a.order - b.order);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = settings.modules.findIndex(m => m.id === active.id);
            const newIndex = settings.modules.findIndex(m => m.id === over.id);
            const newModules = arrayMove(settings.modules, oldIndex, newIndex).map((m, i) => ({ ...m, order: i }));
            updateModuleConfig(newModules);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto w-full">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={visibleModules.map(m => m.id)} strategy={verticalListSortingStrategy}>
                    {visibleModules.map(module => {
                        const Component = COMPONENTS[module.id];
                        return (
                            <SortableItem key={module.id} id={module.id}>
                                <Component />
                            </SortableItem>
                        );
                    })}
                </SortableContext>
            </DndContext>
        </div>
    );
};
