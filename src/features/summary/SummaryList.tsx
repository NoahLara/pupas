import type { DoughType, Filling } from '../../models/Pupusa';
import { Card } from '../../shared/components/Card';

interface AggregatedPupusa {
  dough: DoughType;
  filling: Filling;
  quantity: number;
}

interface SummaryListProps {
  aggregatedPupusas: AggregatedPupusa[];
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

export function SummaryList({ aggregatedPupusas }: SummaryListProps) {
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

  const getDoughDisplayName = (dough: DoughType): string => {
    return dough === 'maiz' ? 'Maíz' : 'Arroz';
  };

  if (aggregatedPupusas.length === 0) {
    return (
      <Card>
        <div className="text-center py-10 text-slate-500 text-sm">
          No hay pupusas en el pedido
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-slate-900 mb-5">Detalle del Pedido</h2>

      <div className="space-y-3">
        {aggregatedPupusas.map((item) => (
          <div
            key={`${item.dough}-${item.filling}`}
            className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{fillingEmojis[item.filling]}</span>
              <span className="font-medium text-slate-900 text-sm">
                {getDoughDisplayName(item.dough)} – {getFillingDisplayName(item.filling)}
              </span>
            </div>
            <span className="font-bold text-orange-600 text-base">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
