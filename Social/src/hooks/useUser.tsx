import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './use-toast'; // Assuming you're using react-toastify for notifications

const registerUser = async (userData) => {
  const response = await axios.post("http://localhost:5000/api/auth/register", userData);
  return response.data;
};

export const useCreateUserAccountMutation = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess: () => {
      toast.success('User registered successfully!');
      // Additional success handling can be added here
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || 'There was an error registering the user!';
      toast.error(errorMessage);
      // Additional error handling can be added here
    },
  });
};