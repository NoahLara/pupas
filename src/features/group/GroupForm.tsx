import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../state/OrderContext';
import { Page } from '../../shared/layout/Page';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';

export function GroupForm() {
  const [groupName, setGroupName] = useState('');
  const [peopleCount, setPeopleCount] = useState(2);
  const { dispatch } = useOrder();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) return;

    dispatch({
      type: 'CREATE_GROUP',
      payload: { groupName: groupName.trim(), peopleCount },
    });

    navigate('/order');
  };

  return (
    <Page>
      <div className="px-5 py-12">
        <div className="text-center mb-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white font-bold">🫓</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            PupusApp
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-slate-600 text-base">
              Ordena pupusas fácil y rápido
            </p>
            <span className="text-lg">🇸🇻</span>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="groupName"
                className="block text-sm font-medium text-slate-700 mb-2.5"
              >
                Nombre del grupo
              </label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Ej: Mesa 3 - Familia López"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Número de personas
              </label>
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                  className="w-10 h-10 flex items-center justify-center p-0"
                >
                  -
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="w-10 text-center font-semibold text-slate-900 text-lg">{peopleCount}</span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPeopleCount(Math.min(20, peopleCount + 1))}
                  className="w-10 h-10 flex items-center justify-center p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
              disabled={!groupName.trim()}
            >
              Comenzar Pedido
            </Button>
          </form>
        </Card>
      </div>
    </Page>
  );
}
