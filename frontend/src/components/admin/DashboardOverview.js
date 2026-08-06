import React from 'react';

const DashboardOverview = ({ products }) => {
  // --- Calculations for Dashboard ---
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const materialCounts = products.reduce((acc, p) => {
    if (p.material) {
      acc[p.material] = (acc[p.material] || 0) + 1;
    }
    return acc;
  }, {});

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 4);

  return (
    <div className="admin-view dashboard-view animate-fade-up">
      <h2><i className="fas fa-chart-line"></i> Store Overview</h2>
      
      <div className="dashboard-bento">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <p className="stat-value">Rs. {totalValue.toLocaleString()}</p>
        </div>

        <div className="breakdown-card">
          <h3>Products by Category</h3>
          <ul>
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <li key={cat}><span>{cat || 'Uncategorized'}</span> <strong>{count}</strong></li>
            ))}
            {Object.keys(categoryCounts).length === 0 && <li>No categories found</li>}
          </ul>
        </div>
        <div className="breakdown-card">
          <h3>Products by Material</h3>
          <ul>
            {Object.entries(materialCounts).map(([mat, count]) => (
              <li key={mat}><span>{mat}</span> <strong>{count}</strong></li>
            ))}
             {Object.keys(materialCounts).length === 0 && <li>No materials found</li>}
          </ul>
        </div>
      </div>

      <div className="recent-additions">
        <h3>Recently Added</h3>
        <div className="recent-grid">
          {recentProducts.length === 0 && <p>No products yet.</p>}
          {recentProducts.map(p => (
            <div key={p._id} className="recent-item">
              <img src={p.imageUrl} alt={p.name} />
              <div>
                <h4>{p.name}</h4>
                <p>Rs. {Number(p.price).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
