export interface SportDiscipline {
  _id: string;
  name: string;
}

export interface CreateSportDisciplineRequest extends Omit<SportDiscipline, '_id'> {}
