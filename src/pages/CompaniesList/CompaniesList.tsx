import { useQuery } from 'react-query';
import api from '../../api';

function CompaniesList() {
  const { isLoading, data: companies } = useQuery('company list', () => api.companies.getAll(), {
    select: ({ data }) => data
  });

  return (
    <div>
      <p className="p1">Companies List</p>
      {isLoading ? (
        <p className="h2">Loading...</p>
      ) : companies?.length ? (
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <span>{company.title}</span>
              <span>{company.service}</span>
              <span>{company.address}</span>
              <span>{company.capital}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="h2">List is empty</p>
      )}
    </div>
  );
}

export default CompaniesList;
