import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../state/OrderContext';
import type { Pupusa, DoughType, Filling } from '../../models/Pupusa';
import { Page } from '../../shared/layout/Page';
import { Button } from '../../shared/components/Button';
import { SummaryTotals } from './SummaryTotals';
import { SummaryList } from './SummaryList';
import { Card } from '../../shared/components/Card';

interface AggregatedPupusa {
  dough: DoughType;
  filling: Filling;
  quantity: number;
}

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

export function KitchenSummary() {
  const { order } = useOrder();
  const navigate = useNavigate();

  if (!order) {
    navigate('/');
    return null;
  }

  // Aggregate pupusas by dough + filling
  const aggregatedPupusas = useMemo(() => {
    const allPupusas: Pupusa[] = order.people.flatMap(person => person.pupusas);

    const aggregated = new Map<string, AggregatedPupusa>();

    allPupusas.forEach(pupusa => {
      const key = `${pupusa.dough}-${pupusa.filling}`;
      const existing = aggregated.get(key);

      if (existing) {
        existing.quantity += pupusa.quantity;
      } else {
        aggregated.set(key, {
          dough: pupusa.dough,
          filling: pupusa.filling,
          quantity: pupusa.quantity,
        });
      }
    });

    return Array.from(aggregated.values()).sort((a, b) => {
      // Sort by dough type first (maiz before arroz), then by filling
      if (a.dough !== b.dough) {
        return a.dough === 'maiz' ? -1 : 1;
      }
      return a.filling.localeCompare(b.filling);
    });
  }, [order]);

  const totalPupusas = aggregatedPupusas.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate totals by dough type
  const doughTotals = useMemo(() => {
    const totals: Record<DoughType, number> = { maiz: 0, arroz: 0 };

    aggregatedPupusas.forEach(item => {
      totals[item.dough] += item.quantity;
    });

    return totals;
  }, [aggregatedPupusas]);

  const handleBack = () => {
    navigate('/order');
  };

  const handleSendToWhatsApp = () => {
    // Build WhatsApp message with complete summary (Salvadoran format)
    let message = `*${order.groupName}*\n`;
    message += `👨‍🍳 *Resumen para Cocina*\n\n`;
    
    // Aggregated List (Kitchen-friendly) - Salvadoran format
    message += `*Detalle del Pedido:*\n`;
    if (aggregatedPupusas.length === 0) {
      message += `No hay pupusas en el pedido\n`;
    } else {
      aggregatedPupusas.forEach((item) => {
        const emoji = item.filling === 'queso' ? '🧀' :
                     item.filling === 'frijoles_con_queso' ? '🫘' :
                     item.filling === 'revueltas' ? '🥓' :
                     item.filling === 'chicharron' || item.filling === 'chicharron_con_queso' ? '🐷' :
                     item.filling === 'loroco_con_queso' ? '🌸' :
                     item.filling === 'ayote' ? '🎃' :
                     item.filling === 'jalapeno' ? '🌶️' :
                     item.filling === 'camaron' ? '🦐' :
                     item.filling === 'pollo' ? '🍗' : '🌮';
        const doughName = getDoughDisplayName(item.dough);
        const fillingName = getFillingDisplayName(item.filling);
        message += `${emoji} ${item.quantity} de ${fillingName} de ${doughName}\n`;
      });
    }
    message += `\n`;
    
    // Per-Person Breakdown - Salvadoran format
    message += `*Resumen por Persona:*\n\n`;
    order.people.forEach((person) => {
      const personTotal = person.pupusas.reduce((sum, p) => sum + p.quantity, 0);
      if (personTotal > 0) {
        message += `*${person.name}:* ${personTotal} pupusa${personTotal !== 1 ? 's' : ''}\n`;
        person.pupusas.forEach((pupusa) => {
          const doughName = getDoughDisplayName(pupusa.dough).toLowerCase();
          const fillingName = getFillingDisplayName(pupusa.filling);
          message += `  • ${pupusa.quantity} de ${doughName} de ${fillingName}\n`;
        });
        message += `\n`;
      }
    });
    
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ${totalPupusas} pupusas*\n`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Page>
      <div className="min-h-screen bg-app">
        {/* Green Header */}
        <div className="bg-action-green px-5 py-4">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="text-white hover:bg-action-green-hover/80 transition-colors flex items-center gap-2 rounded-lg py-1 px-2 -ml-2"
            >
              <span>←</span>
              <span className="text-sm">Volver al pedido</span>
            </button>
          </div>
          <div className="max-w-xl mx-auto mt-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-action-green-hover flex items-center justify-center">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Resumen para Cocina</h1>
              <p className="text-sm text-white/90">{order.groupName}</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 space-y-5">
          <SummaryTotals doughTotals={doughTotals} totalPupusas={totalPupusas} />

          <SummaryList aggregatedPupusas={aggregatedPupusas} />

          {/* Summary by Person */}
          <Card>
            <h2 className="text-lg font-bold text-primary mb-4">Resumen por Persona</h2>
            <div className="space-y-4">
              {order.people.map((person) => {
                const personTotal = person.pupusas.reduce((sum, p) => sum + p.quantity, 0);
                if (personTotal === 0) return null;
                
                return (
                  <div key={person.id} className="border-b border-neutral-border last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-primary">{person.name}</span>
                      <span className="text-secondary font-medium">{personTotal} pupusa{personTotal !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-1 ml-2">
                      {person.pupusas.map((pupusa) => (
                        <div key={pupusa.id} className="text-sm text-secondary">
                          • {pupusa.quantity}x {getDoughDisplayName(pupusa.dough)} - {getFillingDisplayName(pupusa.filling)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="success"
              onClick={handleSendToWhatsApp}
              className="w-full px-4 py-3 flex items-center justify-center gap-2"
            >
              <span>📱</span>
              <span>Enviar a WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
