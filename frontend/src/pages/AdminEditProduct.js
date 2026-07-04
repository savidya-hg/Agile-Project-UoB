import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit Product {id}</h1>
      <p>We will build this in Sprint 2!</p>
      <button onClick={() => navigate('/admin')} className="btn-primary">Back to Admin</button>
    </div>
  );
};
export default AdminEditProduct;