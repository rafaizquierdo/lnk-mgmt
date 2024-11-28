// This is a mock email service for frontend demonstration
// In production, this would be handled by a backend service

export const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // In production, this would make an API call to your backend
    console.log('Verification email sent to:', email);
    console.log('Verification token:', token);
    console.log('Verification link:', `https://lnk-mgmt.es/verify/${token}`);
    
    // For demo purposes, store the token in localStorage
    const pendingVerifications = JSON.parse(localStorage.getItem('pendingVerifications') || '{}');
    pendingVerifications[token] = email;
    localStorage.setItem('pendingVerifications', JSON.stringify(pendingVerifications));
    
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};