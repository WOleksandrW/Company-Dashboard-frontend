import { useParams } from 'react-router-dom';

function CompanyDetail() {
  const { id } = useParams();

  return <p className="p1">Company Detail {id}</p>;
}

export default CompanyDetail;
