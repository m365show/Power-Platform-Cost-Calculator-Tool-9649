// Quest SDK Configuration
export const questConfig = {
  GET_STARTED_QUESTID: 'c-greta-get-started',
  USER_ID: 'u-d175653d-d393-4e1b-82db-7c8c1e66ef1f',
  APIKEY: 'k-6429e7b9-437e-4e1c-8b5f-e8a8b4f24e4b',
  TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWQxNzU2NTNkLWQzOTMtNGUxYi04MmRiLTdjOGMxZTY2ZWYxZiIsImlhdCI6MTc1MDc2NDM5MSwiZXhwIjoxNzUzMzU2MzkxfQ.ENlbypIgE79_m3dTXS_eUE8W0WRvdIVggWtPA_-E1c8',
  ENTITYID: 'e-c5600065-b174-47b9-ad52-cd94ccd8821c',
  PRIMARY_COLOR: '#3b82f6', // Extracted from tailwind primary-600
};

// Helper function to get or generate user ID
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = questConfig.USER_ID;
    localStorage.setItem('userId', userId);
  }
  return userId;
};