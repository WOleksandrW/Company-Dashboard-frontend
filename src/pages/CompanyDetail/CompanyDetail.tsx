import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, IconButton } from '@mui/material';
import api from '../../api';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { BreadcrumbsUsage } from '../../components';
import { CompanyDataSection, UpdateCompanyForm } from './components';
import { EQueryKeys, ERole } from '../../types/enums';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import mapPlaceholder from '../../assets/images/map-placeholder.png';

import styles from './CompanyDetail.module.scss';

function CompanyDetail() {
  const { id } = useParams();

  const { data: userData } = useQueryCurrUser();

  const [isEdit, setIsEdit] = useState(false);

  const { data: companyData } = useQuery(
    [EQueryKeys.COMPANY, { id: +id! }],
    () => api.companies.getOne(+id!),
    {
      select: ({ data }) => data
    }
  );

  const canEdit = useMemo(() => {
    if (!companyData || !userData) return false;
    return (
      companyData.user.id === userData.id ||
      userData.role === ERole.ADMIN ||
      userData.role === ERole.SUPER
    );
  }, [companyData, userData]);

  return (
    <section className={styles['page']}>
      <BreadcrumbsUsage
        list={[
          { to: '/', text: 'Home' },
          { to: '/companies', text: 'Companies list' },
          { text: 'Company' }
        ]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {companyData && (
          <>
            {!isEdit && canEdit && (
              <Box sx={{ display: 'flex', alignSelf: 'flex-end', gap: '12px' }}>
                <IconButton size="large" onClick={() => setIsEdit(true)}>
                  <FaEdit />
                </IconButton>
                <IconButton size="large">
                  <FaTrashAlt />
                </IconButton>
              </Box>
            )}
            {isEdit && canEdit ? (
              <UpdateCompanyForm company={companyData} onClose={() => setIsEdit(false)} />
            ) : (
              <CompanyDataSection company={companyData} />
            )}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <h2 className="h2">Google map</h2>
              <img className={styles['map-image']} src={mapPlaceholder} alt={companyData.address} />
            </Box>
          </>
        )}
      </Box>
    </section>
  );
}

export default CompanyDetail;
