
import React from 'react';
import PageLayout from '@/components/PageLayout';
import EmojiAvatar from '@/components/EmojiAvatar';
import { Banner, BannerSlider } from '@/components/Banner';
import { useUser } from '@/contexts/UserContext';
import { getRandomBannerEmoji } from '@/utils/emojiUtils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { username, avatarEmoji } = useUser();

  // Banner data
  const banners = [
    {
      title: 'SPRING SALE',
      emoji: getRandomBannerEmoji(),
      color: 'bg-telegram-blue dark:bg-telegram-dark'
    },
    {
      title: 'NEW ARRIVALS',
      emoji: getRandomBannerEmoji(),
      color: 'bg-indigo-500 dark:bg-indigo-900/80'
    },
    {
      title: 'EXCLUSIVE DEALS',
      emoji: getRandomBannerEmoji(),
      color: 'bg-violet-500 dark:bg-violet-900/80'
    }
  ];

  return (
    <PageLayout fullHeight className="p-4">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-gray-600 dark:text-gray-400">@{username}</p>
        </div>
        <EmojiAvatar 
          emoji={avatarEmoji} 
          size="md" 
          className="hover-lift"
        />
      </header>

      <section className="mb-8 animate-slide-up">
        <BannerSlider banners={banners} />
      </section>

      {/* Three blocks with updated layout */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        {/* Order Block - takes 1 column but spans 2 rows */}
        <Link 
          to="/shop" 
          className="bg-white dark:bg-sidebar-accent/50 rounded-lg p-4 row-span-2 col-span-1 shadow-sm hover-lift flex flex-col justify-between"
        >
          <div></div> {/* Empty div to push content to bottom */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Заказать</h3>
            <ArrowRight size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
        </Link>

        {/* Right column blocks */}
        <div className="col-span-2 grid grid-rows-2 gap-4">
          {/* DD Coins Block */}
          <div className="bg-telegram-blue text-white dark:bg-telegram-blue rounded-lg p-4 shadow-sm hover-lift flex flex-col justify-between">
            <h3 className="font-medium">DD coin's</h3>
            <div className="text-4xl font-bold mb-1">5300</div>
            <p className="text-xs text-white/80">Баланс и реферальная программа</p>
            <div className="flex justify-end mt-1">
              <ArrowRight size={20} className="text-white/70" />
            </div>
          </div>

          {/* DD Manager Block */}
          <div className="bg-white dark:bg-sidebar-accent/50 rounded-lg p-4 shadow-sm hover-lift">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">DD manager</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Поможет определиться с цветом и размером</p>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight size={20} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-telegram-light dark:bg-sidebar-accent/50 rounded-lg p-6 text-center hover-lift">
            <span className="text-3xl">👕</span>
            <h3 className="mt-2 font-medium">Clothing</h3>
          </div>
          <div className="bg-telegram-light dark:bg-sidebar-accent/50 rounded-lg p-6 text-center hover-lift">
            <span className="text-3xl">👟</span>
            <h3 className="mt-2 font-medium">Footwear</h3>
          </div>
          <div className="bg-telegram-light dark:bg-sidebar-accent/50 rounded-lg p-6 text-center hover-lift">
            <span className="text-3xl">🧢</span>
            <h3 className="mt-2 font-medium">Accessories</h3>
          </div>
          <div className="bg-telegram-light dark:bg-sidebar-accent/50 rounded-lg p-6 text-center hover-lift">
            <span className="text-3xl">🎒</span>
            <h3 className="mt-2 font-medium">Bags</h3>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-medium mb-4">Latest News</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-sidebar-accent/50 p-4 rounded-lg shadow-sm animate-slide-up">
            <h3 className="font-medium">New Collection Arriving Soon</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Get ready for our summer collection dropping next week!</p>
          </div>
          <div className="bg-white dark:bg-sidebar-accent/50 p-4 rounded-lg shadow-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-medium">Free Shipping Weekend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enjoy free shipping on all orders this weekend</p>
          </div>
          <div className="bg-white dark:bg-sidebar-accent/50 p-4 rounded-lg shadow-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-medium">Member Exclusive Discounts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Members get 15% off all accessories this month</p>
          </div>
          <div className="bg-white dark:bg-sidebar-accent/50 p-4 rounded-lg shadow-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-medium">New Store Opening</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Visit our new flagship store in Moscow starting June 1st</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
