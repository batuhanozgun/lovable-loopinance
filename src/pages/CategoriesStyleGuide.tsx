
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '@/modules/UserManagement/common/services/AuthService';
import { ROUTE_PATHS } from '@/modules/Routing';

// This page is now private and accessed via /style-guides/categories
// Redirect to login if accessed directly
const CategoriesStyleGuide = () => {
  return <Navigate to={ROUTE_PATHS.LOGIN} />;
};

export default CategoriesStyleGuide;
