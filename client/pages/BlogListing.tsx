import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blog-posts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function BlogListing() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="MetLL Blog | Dating Advice & Matchmaking Trends"
        description="Read the latest articles on anonymous confessions, dating trends, and how to find your secret crush with MetLL."
        canonicalUrl="https://metll.in/blog"
      />

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-[#311717]" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
            MetLL
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to App
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-[#311717] mb-6 tracking-tight" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
            The MetLL Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Insights, advice, and stories about modern romance, anonymous confessions, and finding your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#311717]">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#311717] mb-3 leading-tight group-hover:text-rose-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-6 flex-grow line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
