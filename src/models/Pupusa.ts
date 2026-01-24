export type DoughType = 'maiz' | 'arroz';

export type Filling =
  | 'queso'
  | 'frijoles_con_queso'
  | 'revueltas'
  | 'chicharron'
  | 'chicharron_con_queso'
  | 'loroco_con_queso'
  | 'ayote'
  | 'jalapeno'
  | 'camaron'
  | 'pollo'
  | 'loca';

export interface Pupusa {
  id: string;
  dough: DoughType;
  filling: Filling;
  quantity: number;
}