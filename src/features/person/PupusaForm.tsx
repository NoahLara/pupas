import { useState, useMemo } from 'react';
import type { DoughType, Filling, Pupusa } from '../../models/Pupusa';
import { Button } from '../../shared/components/Button';
import { Counter } from '../../shared/components/Counter';

interface PupusaFormProps {
  onAdd: (pupusa: Omit<Pupusa, 'id'>) => void;
  onCancel: () => void;
}

const fillingEmojis: Record<Filling, string> = {
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

export function PupusaForm({ onAdd, onCancel }: PupusaFormProps) {
  const [dough, setDough] = useState<DoughType>('maiz');
  const [filling, setFilling] = useState<Filling>('queso');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const allFillings: { value: Filling; label: string }[] = [
    { value: 'queso', label: 'Queso' },
    { value: 'frijoles_con_queso', label: 'Frijoles con Queso' },
    { value: 'revueltas', label: 'Revueltas' },
    { value: 'chicharron', label: 'Chicharrón' },
    { value: 'loroco_con_queso', label: 'Loroco con Queso' },
    { value: 'ayote', label: 'Ayote' },
    { value: 'chicharron_con_queso', label: 'Chicharrón con Queso' },
    { value: 'jalapeno', label: 'Jalapeño' },
    { value: 'camaron', label: 'Camarón' },
    { value: 'pollo', label: 'Pollo' },
    { value: 'loca', label: 'Loca' },
  ];

  // Filter fillings based on search query
  const filteredFillings = useMemo(() => {
    if (!searchQuery.trim()) {
      return allFillings;
    }

    const query = searchQuery.toLowerCase().trim();
    return allFillings.filter(({ label }) =>
      label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSubmit = () => {
    if (quantity < 1) return;
    
    onAdd({
      dough,
      filling,
      quantity,
    });
    
    // Reset form after adding
    setDough('maiz');
    setFilling('queso');
    setQuantity(1);
    setSearchQuery('');
  };

  const isValid = quantity >= 1;

  return (
    <div className="space-y-6">
      {/* Dough Type Selection */}
      <div>
        <label className="block text-sm font-bold text-primary mb-3 uppercase">
          TIPO DE MASA
        </label>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setDough('maiz')}
            className={`flex-1 py-4 px-4 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              dough === 'maiz'
                ? 'border-brand-orange bg-brand-focus-ring/30 text-primary shadow-sm'
                : 'border-neutral-border bg-surface text-secondary hover:bg-app'
            }`}
          >
            <span className="text-xl">🌽</span>
            <span>Maíz</span>
          </button>
          <button
            type="button"
            onClick={() => setDough('arroz')}
            className={`flex-1 py-4 px-4 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              dough === 'arroz'
                ? 'border-brand-orange bg-brand-focus-ring/30 text-primary shadow-sm'
                : 'border-neutral-border bg-surface text-secondary hover:bg-app'
            }`}
          >
            <span className="text-xl">🍚</span>
            <span>Arroz</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div>
        <input
          id="search-filling"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar tipo de pupusas (Ej: Frijol con Queso)"
          className="input-brand"
        />
      </div>

      {/* Filling Selection */}
      <div>
        <label className="block text-sm font-bold text-primary mb-3 uppercase">
          RELLENO
        </label>
        {filteredFillings.length === 0 ? (
          <div className="text-center py-8 text-secondary text-sm">
            No hay de ese tipo
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredFillings.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilling(value)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all relative ${
                  filling === value
                    ? 'border-action-green bg-action-green/10 text-primary shadow-sm'
                    : 'border-neutral-border bg-surface text-secondary hover:bg-app'
                }`}
              >
                {filling === value && (
                  <span className="absolute top-1 right-1 text-action-green">✓</span>
                )}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{fillingEmojis[value]}</span>
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-bold text-primary mb-3 uppercase">
          CANTIDAD
        </label>
        <div className="flex justify-center">
          <Counter value={quantity} onChange={setQuantity} min={1} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2.5 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          className="flex-1"
          disabled={!isValid}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
