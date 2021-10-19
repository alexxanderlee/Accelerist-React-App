import { IFilters } from 'src/interfaces';

const formatFilters = (filters: IFilters) => Object.entries(filters).reduce<string[]>((acc, filter) => {
  const [key, value] = filter;

  if (['q', 'deleteIds', 'scope', 'affinities', 'csrFocusIds'].includes(key)) {
    return acc;
  }
  
  if (key === 'gender') {
    acc.push(`Gender: ${value}`);
  }

  if (key === 'revenueMax') {
    acc.push(`Max revenue: ${value}`);
  }

  if (key === 'revenueMin') {
    acc.push(`Min revenue: ${value}`);
  }

  if (key === 'totalAnnualContributors') {
    acc.push(`Total annual contributors: ${value}`);
  }

  if (Array.isArray(value) && value.length > 0) {
    value.forEach(item => acc.push(`${item}`));
  }

  return acc;
}, []);

export default formatFilters;
