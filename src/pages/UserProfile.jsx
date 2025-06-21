import { useState } from "react";
import { 
  User, 
  Book, 
  BookOpen, 
  Target, 
  Calendar, 
  Star, 
  Heart, 
  Award, 
  TrendingUp, 
  Clock, 
  Edit3,
  Camera,
  Settings,
  Mail,
  MapPin,
  Link as LinkIcon,
  Trophy,
  Flame,
  BookMarked
} from "lucide-react";

const userData = {
  name: "Rohan Jambhulkar",
  username: "@rohan",
  email: "rohan.jambhulkar@email.com",
  location: "New York, USA",
  website: "rohan.blog",
  bio: "Passionate reader, book blogger, and literature enthusiast. Always on the hunt for the next great story to get lost in.",
  joinDate: "March 2022",
  avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80"
};

const stats = {
  booksRead: 127,
  pagesRead: 34250,
  readingStreak: 45,
  avgRating: 4.2,
  yearlyGoal: 150,
  monthlyGoal: 12
};

const recentBooks = [
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    rating: 5,
    status: "completed",
    progress: 100,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4,
    status: "reading",
    progress: 65,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 0,
    status: "want-to-read",
    progress: 0,
    image: "https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?auto=format&fit=crop&w=300&q=80"
  }
];

const achievements = [
  { id: 1, title: "Speed Reader", description: "Read 5 books in a month", icon: Flame, earned: true },
  { id: 2, title: "Diverse Reader", description: "Read 10 different genres", icon: Trophy, earned: true },
  { id: 3, title: "Consistent Reader", description: "30-day reading streak", icon: Target, earned: true },
  { id: 4, title: "Century Club", description: "Read 100 books", icon: Award, earned: true },
  { id: 5, title: "Page Turner", description: "Read 50,000 pages", icon: BookMarked, earned: false },
  { id: 6, title: "Early Bird", description: "Read before 7 AM for 7 days", icon: Clock, earned: false }
];

const readingActivity = [
  { month: "Jan", books: 8 },
  { month: "Feb", books: 12 },
  { month: "Mar", books: 15 },
  { month: "Apr", books: 11 },
  { month: "May", books: 14 },
  { month: "Jun", books: 16 }
];

function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'fill-cyan-400 text-cyan-400' : 'text-gray-500'}`} 
        />
      );
    }
    return stars;
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return '#00ADB5';
    if (progress >= 50) return '#00ADB5';
    return 'rgba(0, 173, 181, 0.6)';
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: { bg: '#00ADB5', text: 'Completed' },
      reading: { bg: 'rgba(0, 173, 181, 0.6)', text: 'Reading' },
      'want-to-read': { bg: '#393E46', text: 'Want to Read' }
    };
    return styles[status] || styles['want-to-read'];
  };

  return (
    <div 
      className="min-h-screen text-gray-100 pb-15"
      style={{ backgroundColor: '#222831' }}
    >
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={userData.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(34, 40, 49, 0.8))' }}
        ></div>
        
        {/* Edit Cover Button */}
        <button 
          className="absolute top-4 right-4 p-2 rounded-lg backdrop-blur-sm border hover:scale-105 transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(34, 40, 49, 0.7)', 
            borderColor: 'rgba(0, 173, 181, 0.3)' 
          }}
        >
          <Camera className="w-5 h-5" style={{ color: '#00ADB5' }} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <div 
          className="rounded-2xl p-6 md:p-8 backdrop-blur-sm border mb-8"
          style={{ 
            backgroundColor: 'rgba(57, 62, 70, 0.9)', 
            borderColor: 'rgba(0, 173, 181, 0.2)' 
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-32 h-50 rounded-2xl object-cover border-4"
                style={{ borderColor: '#00ADB5' }}
              />
              <button 
                className="absolute -bottom-2 -right-2 p-2 rounded-full border hover:scale-105 transition-all duration-300"
                style={{ 
                  backgroundColor: '#00ADB5', 
                  borderColor: '#222831' 
                }}
              >
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-gray-300 mb-1">{userData.username}</p>
                  <p className="text-gray-400 text-sm">Member since {userData.joinDate}</p>
                </div>
                
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-2 rounded-lg font-medium hover:opacity-80 transition-opacity duration-300"
                    style={{ backgroundColor: '#00ADB5', color: 'white' }}
                  >
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </button>
                  <button 
                    className="p-2 rounded-lg border hover:scale-105 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(57, 62, 70, 0.5)', 
                      borderColor: 'rgba(0, 173, 181, 0.3)' 
                    }}
                  >
                    <Settings className="w-5 h-5" style={{ color: '#00ADB5' }} />
                  </button>
                </div>
              </div>

              {/* Bio and Details */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {userData.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <span style={{ color: '#00ADB5' }}>{userData.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div 
            className="rounded-xl p-4 text-center hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'rgba(57, 62, 70, 0.6)' }}
          >
            <Book className="w-8 h-8 mx-auto mb-2" style={{ color: '#00ADB5' }} />
            <div className="text-2xl font-bold text-gray-100">{stats.booksRead}</div>
            <div className="text-sm text-gray-400">Books Read</div>
          </div>
          
          <div 
            className="rounded-xl p-4 text-center hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'rgba(57, 62, 70, 0.6)' }}
          >
            <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: '#00ADB5' }} />
            <div className="text-2xl font-bold text-gray-100">{stats.pagesRead.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Pages Read</div>
          </div>
          
          <div 
            className="rounded-xl p-4 text-center hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'rgba(57, 62, 70, 0.6)' }}
          >
            <Flame className="w-8 h-8 mx-auto mb-2" style={{ color: '#00ADB5' }} />
            <div className="text-2xl font-bold text-gray-100">{stats.readingStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          
          <div 
            className="rounded-xl p-4 text-center hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'rgba(57, 62, 70, 0.6)' }}
          >
            <Star className="w-8 h-8 mx-auto mb-2" style={{ color: '#00ADB5' }} />
            <div className="text-2xl font-bold text-gray-100">{stats.avgRating}</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {['overview', 'books', 'achievements', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              style={{ 
                backgroundColor: activeTab === tab ? '#00ADB5' : 'rgba(57, 62, 70, 0.5)' 
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reading Goals */}
              <div 
                className="rounded-2xl p-6 border hover:border-opacity-60 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(57, 62, 70, 0.4)', 
                  borderColor: 'rgba(0, 173, 181, 0.2)' 
                }}
              >
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6" style={{ color: '#00ADB5' }} />
                  Reading Goals
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Yearly Goal</span>
                      <span className="text-gray-400">{stats.booksRead}/{stats.yearlyGoal}</span>
                    </div>
                    <div 
                      className="h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          backgroundColor: '#00ADB5',
                          width: `${(stats.booksRead / stats.yearlyGoal) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Monthly Goal</span>
                      <span className="text-gray-400">16/{stats.monthlyGoal}</span>
                    </div>
                    <div 
                      className="h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          backgroundColor: '#00ADB5',
                          width: `${(16 / stats.monthlyGoal) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reading Activity Chart */}
              <div 
                className="rounded-2xl p-6 border hover:border-opacity-60 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(57, 62, 70, 0.4)', 
                  borderColor: 'rgba(0, 173, 181, 0.2)' 
                }}
              >
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" style={{ color: '#00ADB5' }} />
                  Reading Activity
                </h3>
                
                <div className="flex items-end justify-between h-32 gap-2">
                  {readingActivity.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full rounded-t-lg mb-2 transition-all duration-700 hover:opacity-80"
                        style={{ 
                          backgroundColor: '#00ADB5',
                          height: `${(item.books / 20) * 100}%`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-400">{item.month}</span>
                      <span className="text-xs font-bold text-gray-200">{item.books}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'books' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-100">Recent Books</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBooks.map((book) => (
                  <div 
                    key={book.id}
                    className="group rounded-xl overflow-hidden border hover:scale-105 hover:shadow-xl transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(57, 62, 70, 0.5)', 
                      borderColor: 'rgba(0, 173, 181, 0.2)' 
                    }}
                  >
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span 
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ 
                            backgroundColor: getStatusBadge(book.status).bg,
                            color: 'white'
                          }}
                        >
                          {getStatusBadge(book.status).text}
                        </span>
                        {book.rating > 0 && (
                          <div className="flex">{renderStars(book.rating)}</div>
                        )}
                      </div>
                      
                      <h4 className="font-bold text-gray-100 mb-1">{book.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">by {book.author}</p>
                      
                      {book.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-gray-300">{book.progress}%</span>
                          </div>
                          <div 
                            className="h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                          >
                            <div 
                              className="h-full rounded-full transition-all duration-700"
                              style={{ 
                                backgroundColor: getProgressColor(book.progress),
                                width: `${book.progress}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-100">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`rounded-xl p-6 border transition-all duration-300 ${
                      achievement.earned 
                        ? 'hover:scale-105 hover:shadow-lg' 
                        : 'opacity-60'
                    }`}
                    style={{ 
                      backgroundColor: achievement.earned 
                        ? 'rgba(0, 173, 181, 0.1)' 
                        : 'rgba(57, 62, 70, 0.4)', 
                      borderColor: achievement.earned 
                        ? 'rgba(0, 173, 181, 0.3)' 
                        : 'rgba(57, 62, 70, 0.6)' 
                    }}
                  >
                    <achievement.icon 
                      className={`w-12 h-12 mx-auto mb-4 ${
                        achievement.earned ? 'text-cyan-400' : 'text-gray-500'
                      }`}
                    />
                    <h4 className={`font-bold text-center mb-2 ${
                      achievement.earned ? 'text-gray-100' : 'text-gray-400'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm text-center ${
                      achievement.earned ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <div className="flex justify-center mt-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#00ADB5' }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-100">Reading Activity</h3>
              <div 
                className="rounded-2xl p-8 border"
                style={{ 
                  backgroundColor: 'rgba(57, 62, 70, 0.4)', 
                  borderColor: 'rgba(0, 173, 181, 0.2)' 
                }}
              >
                <div className="text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4" style={{ color: '#00ADB5' }} />
                  <h4 className="text-xl font-bold text-gray-100 mb-2">Activity Timeline</h4>
                  <p className="text-gray-400">
                    Detailed reading activity and statistics will be displayed here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;