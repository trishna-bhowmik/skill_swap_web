import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/bgImage.jpg';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 text-center backdrop-brightness-[0.95]">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-300">StackIt</span>
        </h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          A collaborative skill-swap platform where you connect, exchange, and grow. Whether you're into tech, design, marketing, or more – there’s something here for everyone.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
        </div>

        <h2 className="text-4xl font-bold mb-12">
          <span className="text-blue-300">Grow</span> With the StackIt Community
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: '🤝', title: 'Skill Swaps', text: 'Exchange skills directly with other learners & professionals.' },
            { icon: '🌐', title: 'Diverse Network', text: 'Connect with users across domains and locations.' },
            { icon: '💬', title: 'Built-in Chat', text: 'Chat and coordinate swap details right on the platform.' },
            { icon: '✅', title: 'Verified Profiles', text: 'See badges and skill validations before swapping.' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-600/30 backdrop-blur-md rounded-xl p-6 text-left shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '📁', title: 'Portfolio Boost', text: 'Work on real projects and build an impressive portfolio.' },
            { icon: '🚀', title: 'Skill Growth', text: 'Learn by doing and collaborating with others.' },
            { icon: '📣', title: 'Visibility', text: 'Stand out in the community with feedback and ratings.' },
            { icon: '💡', title: 'Free Learning', text: 'No fees, just skill-for-skill learning and helping.' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-purple-600/30 backdrop-blur-md rounded-xl p-6 text-left shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
