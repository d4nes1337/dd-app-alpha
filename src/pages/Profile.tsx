
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import EmojiAvatar from '@/components/EmojiAvatar';
import LoadingSpinner from '@/components/LoadingSpinner';
import OrderHistoryItem from '@/components/OrderHistoryItem';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useUser } from '@/contexts/UserContext';
import { fetchOrders } from '@/services/api';

const Profile: React.FC = () => {
  const { username, avatarEmoji, telegramUser, profile } = useUser();

  const { data: orders, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['orders', username],
    queryFn: () => fetchOrders(username),
    staleTime: 60 * 1000, // 1 minute
    retry: 1,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout>
        <div className="p-4 text-center">
          <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Error loading profile</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error instanceof Error ? error.message : 'Please try again later'}
          </p>
          <button 
            className="px-4 py-2 bg-telegram-blue text-white rounded-lg"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </PageLayout>
    );
  }

  const displayOrders = orders || [];

  return (
    <PageLayout>
      <div className="p-4 relative">
        <ThemeToggle />
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <EmojiAvatar 
            emoji={avatarEmoji} 
            size="lg" 
            className="hover-lift"
          />
          <div>
            <h1 className="text-2xl font-semibold">@{username}</h1>
            {telegramUser && telegramUser.first_name && (
              <p className="text-gray-600 dark:text-gray-400">{telegramUser.first_name} {telegramUser.last_name || ''}</p>
            )}
            <div className="mt-2 flex items-center">
              <span className="text-sm bg-telegram-light dark:bg-telegram-dark/20 text-telegram-blue dark:text-telegram-blue px-2 py-1 rounded-full">
                Rank {profile?.rank || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="bg-white dark:bg-sidebar-accent rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-telegram-blue">{displayOrders.length}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Orders</p>
          </div>
          <div className="bg-white dark:bg-sidebar-accent rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-telegram-blue">
              {displayOrders.filter(o => o.status === 'paid').length}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
          </div>
          <div className="bg-white dark:bg-sidebar-accent rounded-lg p-4 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-telegram-blue">
              {displayOrders.filter(o => o.status === 'pending').length}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">Order History</h2>
        {displayOrders.length === 0 ? (
          <div className="text-center py-6 bg-white dark:bg-sidebar-accent rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order, index) => (
              <OrderHistoryItem 
                key={order.order_id} 
                order={order} 
                className="animate-fade-in"
                animationDelay={`${index * 0.1}s`}
              />
            ))}
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-sidebar-accent rounded-lg shadow-sm p-4 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Settings</h2>
          <div className="space-y-2">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-sidebar-primary/10 rounded-lg transition-colors">
              Edit Profile
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-sidebar-primary/10 rounded-lg transition-colors">
              Notification Preferences
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-sidebar-primary/10 rounded-lg transition-colors">
              Shipping Addresses
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-sidebar-primary/10 rounded-lg transition-colors">
              Payment Methods
            </button>
            <button className="w-full text-left py-2 px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
