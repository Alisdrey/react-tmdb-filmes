import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const convertDate = (date: string) => {
  return format(new Date(date),
    "dd 'de' LLLL 'de' yyyy",
    {
      locale: ptBR
    });
};