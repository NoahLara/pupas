import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../state/OrderContext';
import { Page } from '../../shared/layout/Page';
import { Header } from '../../shared/layout/Header';
import { PersonCard } from './PersonCard';
import { Button } from '../../shared/components/Button';

export function PersonList() {
  const { order, dispatch } = useOrder();
  const navigate = useNavigate();

  if (!order) {
    navigate('/');
    return null;
  }

  const totalPupusas = order.people.reduce(
    (sum, person) => sum + person.pupusas.reduce((pSum, p) => pSum + p.quantity, 0),
    0
  );

  const handleBack = () => {
    navigate('/');
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_ORDER' });
    navigate('/');
  };

  const handleGoToSummary = () => {
    navigate('/summary');
  };

  return (
    <Page>
      <Header
        title={order.groupName}
        subtitle={`${order.people.length} persona${order.people.length !== 1 ? 's' : ''}`}
        onBack={handleBack}
        onReset={handleReset}
      />

      <div className="px-5 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>

        <div className="pt-6 mt-4">
          <Button
            type="button"
            variant="success"
            onClick={handleGoToSummary}
            className="w-full flex items-center justify-center gap-2"
          >
            <span>👨‍🍳</span>
            <span>Ver Resumen ({totalPupusas} pupusas)</span>
          </Button>
        </div>
      </div>
    </Page>
  );
}
