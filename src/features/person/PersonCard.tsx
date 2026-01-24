import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Person } from '../../models/Person';
import type { Pupusa, DoughType, Filling } from '../../models/Pupusa';
import { useOrder } from '../../state/OrderContext';
import { Card } from '../../shared/components/Card';
import { Modal } from '../../shared/components/Modal';
import { PupusaForm } from './PupusaForm';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(person.name);
  const [showPupusaForm, setShowPupusaForm] = useState(false);
  const { dispatch } = useOrder();

  const totalPupusas = person.pupusas.reduce((sum, p) => sum + p.quantity, 0);

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      dispatch({
        type: 'RENAME_PERSON',
        payload: { personId: person.id, newName: editName.trim() },
      });
    }
    setIsEditingName(false);
  };

  const handleAddPupusa = (pupusaData: Omit<Pupusa, 'id'>) => {
    dispatch({
      type: 'ADD_PUPUSA',
      payload: { personId: person.id, pupusa: pupusaData },
    });
    setShowPupusaForm(false);
  };

  const handleCloseModal = () => {
    setShowPupusaForm(false);
  };

  const handleRemovePupusa = (pupusaId: string) => {
    dispatch({
      type: 'REMOVE_PUPUSA',
      payload: { personId: person.id, pupusaId },
    });
  };

  const getFillingDisplayName = (filling: Filling): string => {
    const names: Record<Filling, string> = {
      queso: 'Queso',
      frijoles_con_queso: 'Frijoles con Queso',
      revueltas: 'Revueltas',
      chicharron: 'Chicharrón',
      chicharron_con_queso: 'Chicharrón con Queso',
      loroco_con_queso: 'Loroco con Queso',
      ayote: 'Ayote',
      jalapeno: 'Jalapeño',
      camaron: 'Camarón',
      pollo: 'Pollo',
      loca: 'Loca',
    };
    return names[filling] || filling;
  };

  const getFillingEmoji = (filling: Filling): string => {
    const emojis: Record<Filling, string> = {
      queso: '🧀',
      frijoles_con_queso: '🫘',
      revueltas: '🥓',
      chicharron: '🐷',
      chicharron_con_queso: '🐷',
      loroco_con_queso: '🌸',
      ayote: '🎃',
      jalapeno: '🌶️',
      camaron: '🦐',
      pollo: '🍗',
      loca: '🌮',
    };
    return emojis[filling] || '🫓';
  };

  const getDoughDisplayName = (dough: DoughType): string => {
    return dough === 'maiz' ? 'Maíz' : 'Arroz';
  };

  return (
    <>
      <Card>
        <div className="space-y-4">
          {/* Person Name Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">👤</span>
              {isEditingName ? (
                <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-green-600 hover:text-green-700 text-sm"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditName(person.name);
                      setIsEditingName(false);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="font-semibold text-slate-900 text-base">{person.name}</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-slate-600 text-sm"
                  >
                    ✏️
                  </button>
                </>
              )}
            </div>
            {totalPupusas > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
                <span className="text-xs">👁️</span>
                <span className="text-sm font-semibold text-orange-700">{totalPupusas}</span>
              </div>
            )}
          </div>

          {/* Pupusas List */}
          {person.pupusas.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-sm">
              Sin pupusas agregadas
            </div>
          ) : (
            <div className="space-y-2">
              {person.pupusas.map((pupusa) => (
                <div
                  key={pupusa.id}
                  className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFillingEmoji(pupusa.filling)}</span>
                    <span className="text-slate-700 font-medium text-sm">
                      {getFillingDisplayName(pupusa.filling)}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {getDoughDisplayName(pupusa.dough)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium text-sm">x{pupusa.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePupusa(pupusa.id)}
                      className="text-red-500 hover:text-red-600 text-lg leading-none w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Pupusa Button */}
          <button
            type="button"
            onClick={() => setShowPupusaForm(true)}
            className="w-full border-2 border-dashed border-orange-400 rounded-xl py-4 px-4 flex items-center justify-center gap-2 text-orange-600 hover:bg-orange-50 transition-colors font-medium"
          >
            <span className="text-xl">+</span>
            <span>Agregar Pupusa</span>
          </button>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={showPupusaForm}
        onClose={handleCloseModal}
        title="Agregar Pupusa"
      >
        <PupusaForm
          onAdd={handleAddPupusa}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}
