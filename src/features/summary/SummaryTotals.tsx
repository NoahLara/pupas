import type { DoughType } from '../../models/Pupusa';

interface SummaryTotalsProps {
  doughTotals: Record<DoughType, number>;
  totalPupusas: number;
}

export function SummaryTotals({ doughTotals }: SummaryTotalsProps) {
  const hasMaiz = doughTotals.maiz > 0;
  const hasArroz = doughTotals.arroz > 0;
  const hasBoth = hasMaiz && hasArroz;

  // If we have both types, show both
  if (hasBoth) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Maíz Card */}
        <div className="bg-brand-focus-ring/20 rounded-xl border-2 border-brand-orange/40 p-6 text-center shadow-sm">
          <div className="text-4xl mb-2">🌽</div>
          <div className="text-4xl font-bold text-primary mb-1">{doughTotals.maiz}</div>
          <div className="text-lg font-semibold text-secondary">Maíz</div>
        </div>
        
        {/* Arroz Card */}
        <div className="bg-brand-focus-ring/20 rounded-xl border-2 border-brand-orange/40 p-6 text-center shadow-sm">
          <div className="text-4xl mb-2">🍚</div>
          <div className="text-4xl font-bold text-primary mb-1">{doughTotals.arroz}</div>
          <div className="text-lg font-semibold text-secondary">Arroz</div>
        </div>
      </div>
    );
  }

  // If we only have one type, show just that one
  const primaryDough: DoughType = hasMaiz ? 'maiz' : 'arroz';
  const primaryCount = doughTotals[primaryDough];
  const doughEmoji = primaryDough === 'maiz' ? '🌽' : '🍚';
  const doughLabel = primaryDough === 'maiz' ? 'Maíz' : 'Arroz';

  return (
    <div className="bg-brand-focus-ring/20 rounded-xl border-2 border-brand-orange/40 p-6 text-center shadow-sm">
      <div className="text-4xl mb-2">{doughEmoji}</div>
      <div className="text-4xl font-bold text-primary mb-1">{primaryCount}</div>
      <div className="text-lg font-semibold text-secondary">{doughLabel}</div>
    </div>
  );
}
